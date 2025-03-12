import React from "react";
import { EmojiIcon } from "../../../svg-2";

export default function EmojiPicker() {
  return (
    <li>
      <button className="btn" type="button">
        <EmojiIcon className="dark:fill-dark_svg_1" />
      </button>
    </li>
  );
}
