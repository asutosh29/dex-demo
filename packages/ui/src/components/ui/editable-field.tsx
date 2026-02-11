import { useState, useRef, useEffect, useCallback, useId } from "react";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
  TagsInput,
  TagsInputList,
  TagsInputInput,
  TagsInputItem,
} from "@repo/ui/components/ui/tags-input";
import { Check, X, Loader2 } from "@repo/ui/icons";

type EditableFieldVariant<T extends "text" | "multiline" | "tags"> = {
  type: T;
  value: T extends "text" ? string : T extends "multiline" ? string : string[];
  onSave: (
    value: T extends "text"
      ? string
      : T extends "multiline"
        ? string
        : string[],
  ) => Promise<void> | void;
};

type BaseEditableFieldProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  /** Position action buttons inline with input (default: false, buttons below) */
  inlineActions?: boolean;
  /** Show save/cancel action buttons (default: true) */
  showActions?: boolean;
  /** Additional classes for the input element */
  inputClassName?: string;
  /** Element to render before the input (e.g., icon) */
  inputPrefix?: React.ReactNode;
  /** Element to render after the input (e.g., icon) */
  inputSuffix?: React.ReactNode;
  /** Called when entering edit mode */
  onEditStart?: () => void;
  /** Custom render for display mode - receives the current value */
  children?: (value: string | string[]) => React.ReactNode;
};

type EditableFieldProps = EditableFieldVariant<"text" | "multiline" | "tags"> &
  BaseEditableFieldProps;

function EditableField({
  type,
  value,
  label,
  placeholder,
  className,
  onSave,
  onEditStart,
  disabled = false,
  inlineActions = false,
  showActions = true,
  inputClassName,
  inputPrefix,
  inputSuffix,
  children,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState<string | string[]>(value);
  const [isSaving, setIsSaving] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const labelId = useId();
  const inputId = useId();

  // Sync local value when prop changes (e.g., after optimistic update rollback)
  useEffect(() => {
    if (!isEditing) {
      setLocalValue(value);
    }
  }, [value, isEditing]);

  // Focus and select text when entering edit mode
  const setInputRefCallback = useCallback(
    (node: HTMLInputElement | HTMLTextAreaElement | null) => {
      inputRef.current = node;
      if (node && isEditing) {
        node.focus();
        // Select all text for easier replacement
        if ("select" in node && typeof node.select === "function") {
          node.select();
        }
      }
    },
    [isEditing],
  );

  // Click outside to save
  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleSave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing, localValue]);

  const handleSave = async () => {
    if (isSaving) return;

    // Don't save if value hasn't changed
    const hasChanged = Array.isArray(value)
      ? JSON.stringify(value) !== JSON.stringify(localValue)
      : value !== localValue;

    if (!hasChanged) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(localValue as never);
      setIsEditing(false);
    } catch {
      // Error handled by parent mutation, revert local value
      setLocalValue(value);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setLocalValue(value);
    setIsEditing(false);
  };

  const handleStartEditing = () => {
    if (disabled) return;
    setIsEditing(true);
    onEditStart?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Escape cancels editing
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      handleCancel();
      return;
    }
    // For text input, Enter saves; for textarea, Cmd/Ctrl+Enter saves
    if (e.key === "Enter") {
      if (type === "text" || e.metaKey || e.ctrlKey) {
        e.preventDefault();
        handleSave();
      }
    }
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      handleStartEditing();
    }
  };

  // Common data attributes for CSS hooks
  const dataAttributes = {
    "data-state": isEditing ? "editing" : "viewing",
    "data-disabled": disabled || undefined,
    "data-saving": isSaving || undefined,
  };

  // Check if we have prefix/suffix decorations
  const hasDecorations = inputPrefix || inputSuffix;

  // Action buttons component
  const ActionButtons = (
    <div
      className={cn(
        "flex gap-1",
        !inlineActions && "mt-2",
        inlineActions && "shrink-0",
      )}
      role="group"
      aria-label="Edit actions"
    >
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleSave}
        disabled={isSaving}
        aria-label="Save changes"
      >
        {isSaving ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Check className="size-4" aria-hidden="true" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleCancel}
        disabled={isSaving}
        aria-label="Cancel editing"
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );

  // Render display mode
  if (!isEditing) {
    return (
      <div
        ref={containerRef}
        className={cn("group/editable", className)}
        {...dataAttributes}
      >
        {label && (
          <label id={labelId} className="font-semibold mb-2 block">
            {label}
          </label>
        )}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={
            disabled
              ? `${label || "Field"}: ${Array.isArray(value) ? value.join(", ") : value}`
              : `${label || "Field"}: ${Array.isArray(value) ? value.join(", ") : value}. Double-click or press Enter to edit`
          }
          aria-labelledby={label ? labelId : undefined}
          aria-disabled={disabled}
          className={cn(
            "rounded-md transition-colors p-1 group/field",
            !disabled &&
              "cursor-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            disabled && "cursor-default",
          )}
          onDoubleClick={handleStartEditing}
          onKeyDown={handleTriggerKeyDown}
        >
          {children ? (
            <span
              className={cn(
                "inline-block rounded-md p-2 -mx-1 -my-2 transition-colors",
                !disabled && "group-hover/field:bg-muted/60",
              )}
            >
              {children(value)}
            </span>
          ) : (
            <span className="text-sm">
              {Array.isArray(value) ? value.join(", ") : value}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Shared input props
  const sharedInputProps = {
    id: inputId,
    onKeyDown: handleKeyDown,
    placeholder,
    disabled: isSaving,
    "aria-describedby": isSaving ? "saving-status" : undefined,
  };

  // Input content based on type
  const InputContent = (
    <>
      {type === "text" && (
        <input
          {...sharedInputProps}
          ref={setInputRefCallback as React.RefCallback<HTMLInputElement>}
          value={localValue as string}
          onChange={(e) => setLocalValue(e.target.value)}
          className={cn(
            "bg-transparent border-none outline-none focus:ring-0 w-full",
            inputClassName,
          )}
        />
      )}

      {type === "multiline" && (
        <Textarea
          {...sharedInputProps}
          ref={setInputRefCallback as React.RefCallback<HTMLTextAreaElement>}
          value={localValue as string}
          onChange={(e) => setLocalValue(e.target.value)}
          className={inputClassName}
        />
      )}

      {type === "tags" && (
        <div onKeyDown={handleKeyDown}>
          <TagsInput
            value={localValue as string[]}
            onValueChange={(v) => setLocalValue(v)}
            disabled={isSaving}
            className={cn("w-full", inputClassName)}
          >
            <TagsInputList>
              {(localValue as string[]).map((tag) => (
                <TagsInputItem key={tag} value={tag}>
                  {tag}
                </TagsInputItem>
              ))}
              <TagsInputInput
                ref={setInputRefCallback as React.RefCallback<HTMLInputElement>}
                placeholder={placeholder || "Add tag..."}
              />
            </TagsInputList>
          </TagsInput>
        </div>
      )}
    </>
  );

  // Wrap input with prefix/suffix if provided
  const DecoratedInput = hasDecorations ? (
    <div className="inline-flex items-baseline gap-2 w-full">
      {inputPrefix}
      {InputContent}
      {inputSuffix}
    </div>
  ) : (
    InputContent
  );

  // Render edit mode
  return (
    <div
      ref={containerRef}
      className={cn("group/editable", className)}
      {...dataAttributes}
      role="group"
      aria-labelledby={label ? labelId : undefined}
      aria-busy={isSaving}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          className="font-semibold mb-2 block"
        >
          {label}
        </label>
      )}

      {inlineActions ? (
        <div className="flex items-center gap-1">
          <div className="rounded-md p-1 flex-1">{DecoratedInput}</div>
          {showActions && ActionButtons}
        </div>
      ) : (
        <div className="p-1.5">
          {DecoratedInput}
          {showActions && ActionButtons}
        </div>
      )}

      {/* Screen reader status */}
      {isSaving && (
        <span id="saving-status" className="sr-only" aria-live="polite">
          Saving changes...
        </span>
      )}
    </div>
  );
}

export { EditableField };
export type { EditableFieldProps };
