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
const prompt = `Create a meal plan for 5 days with my goal of ${vibe}. Give me meals that are easy and quick to cook. Here are my dietary restrictions: ${bio}. Don't include any food allergens from my dietary restrictions.  If the word "nut" is mentioned in any way, don't include any tree nut allergens, peanuts, coconuts, almonds, Brazil nuts, cashews, hazelnuts, macadamia nuts, pecans, pine nuts (pignolias), pistachio nuts, walnuts, or almonds.If the word "soy" is mentioned in any way, don't include any soy bean allergens, don't include tofu. Include a grocery list for the week at the end. Don't exceed $70 in grocery costs for the week." 
${vibe === "Weight Loss"
    ? "Make sure the meals don't exceed 1400 calories per day."
    : vibe === "Weight Gain" // Weight gain
    ? "Make sure the meals are high in protein."
    : vibe === "Maintain Weight" // Maintain weight
    ? "Make sure the meals are around exceed 2000 calories per day."
    : null
},

${bio.includes("nut")
    ? "Make sure the meals don't include any tree nut products"
    : bio.includes("soy")
    ? "Make sure the meals don't include any soy bean products or tofu"
    : ""
}`;

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
              What are your dietary restrictions? {" "}
              <span className="text-slate-500">
                (ex.vegan, nut allergy, soy allergy, gluten allergy, or a combination)
              </span>
              .
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={1}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            // placeholder={
            //   // "vegan and nut allergy"
            // }
          />

          <div className="flex mb-5 mt-10  items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your goal.</p>
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
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Your Meal Plan
                </h2>
              </div>
              <div className="mx-auto flex h-full w-[300px] flex-col justify-center space-y-6 sm:w-[600px]">
                <div className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border overflow-y-auto">
                  <pre style={{ whiteSpace: "pre-wrap" }}>{generatedRecipes}</pre>
                </div>
                <div className="btnDiv">
                  <button
                    id="downloadBtn"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => {
                      const doc = new jsPDF();
                      doc.text(generatedRecipes.toString(), 10, 10);
                      doc.save("mealplan.pdf");
                      toast("Meal Plan downloaded", { icon: "👨‍🍳" });
                    }}
                  >
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                    Download
                  </button>
                </div>
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