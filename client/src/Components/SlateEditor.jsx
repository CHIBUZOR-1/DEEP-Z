import React, { useMemo } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';

const SlateEditor = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const initialValue = [{ type: 'paragraph', children: [{ text: 'Hello, Slate!' }] }];

  return (
    <Slate
      editor={editor}
      value={value || initialValue}
      onChange={(newValue) => onChange(newValue)}
    >
      <Editable placeholder="Enter some text..." />
    </Slate>
  );
};

export default SlateEditor;
