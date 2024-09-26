import { KeyboardEvent } from "react";

export function allowOnlyNumbers(event: KeyboardEvent<HTMLInputElement>) {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    ","
  ];

  // Allow control keys (backspace, tab, arrow keys, delete)
  if (allowedKeys.includes(event.key)) {
    return;
  }

  // Check if the key pressed is a number (0-9)
  const isNumber = /^[0-9]$/.test(event.key);

  if (!isNumber) {
    event.preventDefault(); // Prevent input if it's not a number
  }
}
