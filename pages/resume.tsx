import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/MealPlanDropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import jsPDF from "jspdf";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Weight Loss");
  const [generatedRecipes, setgeneratedRecipes] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

//   meal plan prompt
// Give me a meal plan for 5 days with my goal of losing weight. And I'm allergic to nuts. Include two recipes and a grocery list.
//Create a table of 15 careers I'm qualified for with a percentage score on likelihood of a callback and an explanation of why I am qualified based on this resume below: 
const prompt = `Create a table of 5 careers I'm qualified for with a percentage score on likelihood of a callback and an explanation of why I am qualified based on this ${bio}. Show the output as a table"`


// prompt v2 with recipes and grocery list
//const prompt = `Create a meal plan for 5 days with my goal of ${vibe}. Here are my dietary restrictions ${bio}. Include two recipes and a grocery list." 


// old prompt
//   const prompt = `Create a ${vibe} vegan ${bio} recipe with detailed step-by-step instructions by a chef and include the name of the dish. 
//   Don't include the words "Recipe" or "Dish", only the name of the dish". ${
//     vibe === "Weight Loss"
//       ? "Make sure it is a recipe that can be enjoyed anytime of day."
//       : vibe === "Weight Gain"
//       ? "Make sure it is a recipe that is easy to cook."
//       : vibe === "Maintain Weight"
//       ? "Make sure it is a recipe that would be prepared at a restaurant"
//       : null
//   }`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setgeneratedRecipes("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}: ${response.statusText}`);
    }    

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setgeneratedRecipes((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Meal Plan Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Your Customized Meal Plan
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Paste your resume {" "}
              {/* <span className="text-slate-500">
                (ex. 50, , 100, gluten allergy, or a combination)
              </span> */}
              
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={20}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            // placeholder={
            //   // "vegan and nut allergy"
            // }
          />

          <div className="flex mb-5 mt-10  items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your goal</p>
              {/* <span className="text-slate-500">
                (ex. we, , 100, gluten allergy, or a combination)
              </span>  */}
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div>

          {!loading && (
            <div className="flex flex-col md:flex-row gap-4">
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Let's eat! &rarr;
            </button>
            {/* <button
              id="surpriseMeBtn"
              className="bg-yellow rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              // onClick={handleSurpriseMeClick}
            >
              Surprise Me! 
            </button> */}
          </div>
          
            
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        {/* <hr className="bg-gray-700 border-1 dark:bg-gray-700" /> */}
        <div className="space-y-10 my-10">
            {generatedRecipes && (
                <>
                <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                    Your Meal Plan
                    </h2>
                </div>
                <div className="mx-auto flex h-full w-[300px] flex-col justify-center space-y-6 sm:w-[1000px]">
                    <table className="bg-white rounded-xl shadow-md hover:bg-gray-100 transition cursor-copy border">
                    <thead>
                        <tr>
                        <th className="px-4 py-2 border border-gray-300">Generated Recipes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="px-4 py-2 border border-gray-300">
                            <pre style={{ whiteSpace: "pre-wrap" }}>{generatedRecipes}</pre>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    {Response && (
                    <table className="bg-white rounded-xl shadow-md hover:bg-gray-100 transition cursor-copy border">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">API Response</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="px-4 py-2 border border-gray-300">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <pre style={{ whiteSpace: "pre-wrap" }}>{Response}</pre>
                            </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    )}
                </div>
                </>
                )}
            </div>

      </main>
      <Footer />
    </div>
  );
};

export default Home;