import React from "react";

function TextareaForm({ forwardedRef, value, changeTextarea }) {
  return (
    <div className="stikerContent">
      <textarea ref={forwardedRef} value={value} onChange={changeTextarea} />
    </div>
  );
}

export default React.forwardRef((props, ref) => (
  <TextareaForm forwardedRef={ref} {...props} />
));
