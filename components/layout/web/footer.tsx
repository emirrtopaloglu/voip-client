export default function Footer() {
  return (
    <div className="bg-white">
      <div className="container flex items-center flex-col space-y-4 py-8">
        <img
          src="https://ehya.designspace.io/assets/images/logo.svg"
          className="h-6"
        />
        <p className="text-sm text-stone-400">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
