import type { NextPage } from "next";
import Link from "next/link";

const NewPage: NextPage = () => {
  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
      <div className="-m-1 flex flex-wrap md:-m-2">
        <div className="flex w-1/3 flex-wrap">
          <Link href="/photo/1">
            <a className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              />
            </a>
          </Link>
        </div>
        <div className="flex w-1/3 flex-wrap">
          <Link href="/photo/2">
            <a className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
              />
            </a>
          </Link>
        </div>
        <div className="flex w-1/3 flex-wrap">
          <Link href="/photo/3">
            <a className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
              />
            </a>
          </Link>
        </div>
        <div className="flex w-1/3 flex-wrap">
          <Link href="/photo/4">
            <a className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
              />
            </a>
          </Link>
        </div>
        <div className="flex w-1/3 flex-wrap">
          <Link href="/photo/5">
            <a className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp"
              />
            </a>
          </Link>
        </div>
        <div className="flex w-1/3 flex-wrap">
          <Link href="/photo/6">
            <a className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
