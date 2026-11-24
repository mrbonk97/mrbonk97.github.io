const statusColors = {
  IDLE: "text-muted-foreground",
  PENDING: "text-custom-200 dark:text-custom-300",
  PENDING_UPSERT: "text-custom-200 dark:text-custom-300",
  UPLOADING: "text-custom-200 dark:text-custom-300",
  SYNCED: "text-custom-100 dark:text-custom-300",
  SUCCESS: "text-custom-100 dark:text-custom-300",
  PENDING_DELETE: "text-destructive",
  DELETING: "text-destructive",
  FAILED: "text-destructive",
};

export function StatusLabel({ status }: { status: keyof typeof statusColors }) {
  return (
    <code className={`font-medium ${statusColors[status]}`}>{status}</code>
  );
}
