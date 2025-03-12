import React from "react";
import { AttachmentIcon } from "../../../svg-2";

export default function Attachments() {
  return (
    <li className="relative">
      <button type="button" className="btn">
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
    </li>
  );
}
