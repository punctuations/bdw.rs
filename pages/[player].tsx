import { useRouter } from "next/router";
import Head from "next/head";
import { HypixelAPI, Player } from "hypixel-api-v2";
import React from "react";
import { Header } from "../components/header";
import MainLayout from "../layouts/main";
const hypixel = new HypixelAPI(process.env.HYPIXEL!);

interface Props {
  playerData: Player;
  status: any;
}

export default function Post({ playerData, status }: Props) {
  const ones = Object.entries(playerData.stats["Bedwars"]).filter(
    (key, value) => {
      return key[0].includes("eight_one");
    }
  );

  const twos = Object.entries(playerData.stats["Bedwars"]).filter(
    (key, value) => {
      return key[0].includes("eight_two");
    }
  );
  const threes = Object.entries(playerData.stats["Bedwars"]).filter(
    (key, value) => {
      return key[0].includes("four_three");
    }
  );
  const fours = Object.entries(playerData.stats["Bedwars"]).filter(
    (key, value) => {
      return key[0].includes("four_four");
    }
  );

  let bedwars = playerData.stats["Bedwars"];

  return (
    <MainLayout>
      <Head>
        <title>{playerData.displayname}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <div>
          <h1 className="text-left font-bold pt-4 text-xl pb-4 dark:text-white">
            stats for {playerData.displayname} (
            {playerData.achievements.bedwars_level} ✰)
          </h1>
          {/* <h2 className="text-left pb-4">currently playing x</h2> */}
        </div>
        <div>
          <h1 className="text-left font-normal text-lg pb-2">Overall Stats</h1>
          <ToolLink title="Total Kills" description={bedwars.kills_bedwars} />
          <ToolLink title="Total Deaths" description={bedwars.deaths_bedwars} />
          <ToolLink
            title="K/D Ratio"
            description={
              (Math.floor(
                Number(bedwars.kills_bedwars / bedwars.deaths_bedwars) * 100
              ) / 100) as unknown as string
            }
          />
        </div>
      </main>
    </MainLayout>
  );
}

export async function getServerSideProps(params: {
  query: { player: string };
}) {
  const { player } = params.query;
  const playerData = await hypixel.player(player);
  const status = await hypixel.status(player);
  return { props: { playerData, status } };
}
function ToolLink(props: { title: string; description: string }) {
  return (
    <div className="float-left mb-2 mr-2">
      <a className="transform hover:scale-95 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:hover:text-gray-300 shadow-full inline-block border hover:border-red-100 transition ease-in-out bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-md p-3 dark:text-gray-500 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="font-semibold text-sm sm:text-regular">{props.title}</h1>
        <p className="text-xs">{props.description}</p>
      </a>
    </div>
  );
}
