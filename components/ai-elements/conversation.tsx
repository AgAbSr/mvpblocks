'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, DownloadIcon } from 'lucide-react';
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import { useCallback } from 'react';
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom';
import type { UIMessage } from 'ai';

export type ConversationProps = ComponentProps<typeof StickToBottom>;

export const Conversation = ({ className, ...props }: ConversationProps) => (
  <StickToBottom
    className={cn('relative overflow-y-auto', className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export type ConversationContentProps = ComponentProps<
  typeof StickToBottom.Content
>;

export const ConversationContent = ({
  className,
  ...props
}: ConversationContentProps) => (
  <StickToBottom.Content className={cn('p-4', className)} {...props} />
);

export type ConversationEmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
};

export const ConversationEmptyState = ({
  className,
  title,
  description,
  icon,
  children,
  ...props
}: ConversationEmptyStateProps) => (
  <div
    className={cn(
      'flex size-full flex-col items-center justify-center gap-3 p-8 text-center',
      className,
    )}
    {...props}
  >
    {icon ? (
      <div className="text-muted-foreground flex items-center justify-center">
        {icon}
      </div>
    ) : null}
    {title ? <h3 className="text-lg font-semibold">{title}</h3> : null}
    {description ? (
      <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
    ) : null}
    {children}
  </div>
);

export type ConversationScrollButtonProps = ComponentProps<typeof Button>;

export const ConversationScrollButton = ({
  className,
  ...props
}: ConversationScrollButtonProps) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    !isAtBottom && (
      <Button
        className={cn(
          'absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full',
          className,
        )}
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="outline"
        {...props}
      >
        <ArrowDownIcon className="size-4" />
      </Button>
    )
  );
};

/**
 * Convert a list of UIMessages to a Markdown transcript.
 * Pass a `formatMessage` to override the per-message rendering.
 */
export function messagesToMarkdown(
  messages: UIMessage[],
  formatMessage?: (message: UIMessage, index: number) => string,
): string {
  return messages
    .map((message, i) => {
      if (formatMessage) return formatMessage(message, i);
      const role =
        message.role === 'user'
          ? '**User**'
          : message.role === 'assistant'
            ? '**Assistant**'
            : `**${message.role}**`;
      const text = message.parts
        .filter((p): p is Extract<typeof p, { type: 'text' }> => p.type === 'text')
        .map((p) => p.text)
        .join('');
      return `${role}\n\n${text}`;
    })
    .join('\n\n---\n\n');
}

export type ConversationDownloadProps = Omit<
  ComponentProps<typeof Button>,
  'onClick' | 'children'
> & {
  messages: UIMessage[];
  filename?: string;
  formatMessage?: (message: UIMessage, index: number) => string;
  children?: ReactNode;
};

export const ConversationDownload = ({
  messages,
  filename,
  formatMessage,
  className,
  children,
  disabled,
  ...props
}: ConversationDownloadProps) => {
  const handleDownload = useCallback(() => {
    if (typeof window === 'undefined' || messages.length === 0) return;

    const markdown = messagesToMarkdown(messages, formatMessage);
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename ?? `conversation-${Date.now()}.md`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, [messages, filename, formatMessage]);

  return (
    <Button
      aria-label="Download conversation as Markdown"
      className={cn(
        'absolute top-4 right-4 rounded-full',
        className,
      )}
      disabled={disabled ?? messages.length === 0}
      onClick={handleDownload}
      size="icon"
      type="button"
      variant="outline"
      {...props}
    >
      {children ?? <DownloadIcon className="size-4" />}
    </Button>
  );
};
