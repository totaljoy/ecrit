import * as React from 'react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

export default function MinHeightTextarea() {

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: 'Cardo', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    padding: 8px 12px;
    border-radius: 10px;

    &:focus {

    }
  `,
  );

  return (
    <Textarea aria-label="minimum height" minRows={3} placeholder="Add review..." />
  );
}