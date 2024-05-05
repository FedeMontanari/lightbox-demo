import PictureGallery from "@/components/PictureGallery";
import { UnsplashResponse } from "@/types/unsplash";

const { UNSPLASH_KEY } = process.env;

async function getPictures(): Promise<UnsplashResponse[]> {
  const res = await fetch("https://api.unsplash.com/photos", {
    headers: {
      Authorization: UNSPLASH_KEY!,
    },
  });
  const data = await res.json();
  return data;
}

export default async function Home() {
  const pictures = await getPictures();
  return (
    <main className="flex flex-col items-center justify-center p-12">
      <h1 className="text-2xl font-bold border-b mb-5">
        Pictures Gallery and Lightbox
      </h1>
      <section className="flex flex-row items-center justify-center flex-wrap gap-3">
        <PictureGallery pictures={pictures} />
      </section>
    </main>
  );
}
