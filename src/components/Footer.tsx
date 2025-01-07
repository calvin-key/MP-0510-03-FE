import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-14 text-xs text-gray-400">
      <div className="bg-black">
        <div className="container mx-auto grid grid-cols-2 justify-center gap-x-5 gap-y-10 px-5 py-16 md:flex md:gap-32">
          <div className="flex flex-col gap-3">
            <h6 className="font-semibold text-white">Find Events</h6>
            <div className="flex flex-col gap-1">
              <Link href="/" className="hover:text-orange-400">
                Browse Events
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="font-semibold text-white">Host Events</h6>
            <div className="flex flex-col gap-1">
              <Link href="/user-guide" className="hover:text-orange-400">
                How it works
              </Link>
              <Link href="/dashboard/create-event" className="hover:text-orange-400">
                Create an event
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="font-semibold text-white">Help</h6>
            <div className="flex flex-col gap-1">
              <Link href="/transactions" className="hover:text-orange-400">
                My Orders
              </Link>
              <Link href="/contact-support" className="hover:text-orange-400">
                Contact Support
              </Link>
              <Link href="/privacy-policy" className="hover:text-orange-400">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-orange-400">
                Terms & Conditions
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="font-semibold text-white">Connect</h6>
            <div className="flex flex-col gap-1">
              <Link
                href="https://www.facebook.com"
                target="blank"
                className="hover:text-orange-400"
              >
                Facebook
              </Link>
              <Link
                href="https://www.Instagram.com"
                target="blank"
                className="hover:text-orange-400"
              >
                Instagram
              </Link>
              <Link
                href="https://www.x.com"
                target="blank"
                className="hover:text-orange-400"
              >
                X
              </Link>
              <Link
                href="https://www.tiktok.com"
                target="blank"
                className="hover:text-orange-400"
              >
                TikTok
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-700 p-5 text-center text-sm text-white">
        <p>© 2025 Scaena. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
