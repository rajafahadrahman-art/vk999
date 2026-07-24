import { siteConfig } from "@/lib/site-config";

type Props = {
  label?: string;
  className?: string;
};

export default function DownloadButton({
  label = "Download VK999 APK",
  className = "btn btn-primary",
}: Props) {
  return (
    <a
      href={siteConfig.downloadUrl}
      className={className}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
    >
      {label}
    </a>
  );
}
