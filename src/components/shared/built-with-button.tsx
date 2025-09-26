import { WorkflowLabLogo } from '@/components/layout/logo-workflowlab';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function BuiltWithButton() {
  return (
    <Link
      target="_blank"
      href="https://workflowlab.com?utm_source=built-with-workflowlab"
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'border border-border px-4 rounded-md'
      )}
    >
      <span>Built with</span>
      <span>
        <WorkflowLabLogo className="size-5 rounded-full" />
      </span>
      <span className="font-semibold">WorkflowLab</span>
    </Link>
  );
}
