import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found container">
      <h1>Page not found</h1>
      <p>The page you requested is unavailable. Try one of these VK999 guides:</p>
      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="/vk999-download/">VK999 Download</Link>
        </li>
        <li>
          <Link href="/vk999-login/">VK999 Login</Link>
        </li>
        <li>
          <Link href="/vk999-deposit-guide/">VK999 Deposit Guide</Link>
        </li>
        <li>
          <Link href="/vk999-withdrawal-guide/">VK999 Withdrawal Guide</Link>
        </li>
      </ul>
    </main>
  );
}
