import type { NextPage } from "next";

const NewPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4">
        <nav className="flex justify-between items-center">
          <a href="/" className="font-bold text-3xl">Lexica</a>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-500">About</a></li>
            <li><a href="#" className="hover:text-gray-500">Works</a></li>
            <li><a href="#" className="hover:text-gray-500">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow">
        <div className="grid grid-cols-3 gap-4 p-4">
          <img src="/images/image1.jpg" alt="Image 1" className="rounded-lg" />
          <img src="/images/image2.jpg" alt="Image 2" className="rounded-lg" />
          <img src="/images/image3.jpg" alt="Image 3" className="rounded-lg" />
          <img src="/images/image4.jpg" alt="Image 4" className="rounded-lg" />
          <img src="/images/image5.jpg" alt="Image 5" className="rounded-lg" />
          <img src="/images/image6.jpg" alt="Image 6" className="rounded-lg" />
        </div>
      </main>
      <footer className="p-4">
        <p className="text-center">&copy; 2023 Lexica. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NewPage;
