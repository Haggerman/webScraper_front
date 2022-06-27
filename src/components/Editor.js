import React from 'react';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';

export default function Editor({handleChange}) {
  return (
    <CodeMirror
      value="Add the patterns here!"
      height="100%"
      theme={oneDark}
      firstLineNumber={10}
      onChange={(value) => {
        handleChange(value)
      }}
    />
  );
}