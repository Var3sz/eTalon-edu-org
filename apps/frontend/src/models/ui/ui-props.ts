import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { buttonVariants } from '@/components/ui/button';

// Div
export type HTMLDivElementProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

// Paragraph
export type HTMLParagraphElementProps = React.HTMLAttributes<HTMLParagraphElement> & {
  className?: string;
};

// Button
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Input
export type InputProps = React.ComponentProps<'input'> & {
  className?: string;
  type?: string;
};

// Table
export type TableProps = React.HTMLAttributes<HTMLTableElement> & { className?: string };
export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> & { className?: string };
export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & { className?: string };
export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement> & { className?: string };
export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & { className?: string };
export type TableHeaderCellProps = React.ThHTMLAttributes<HTMLTableCellElement> & { className?: string };
export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & { className?: string };
export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement> & { className?: string };
