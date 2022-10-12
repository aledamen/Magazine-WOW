import axios from "axios";
import renderer from "../hooks/components";

export default function Home({ home, ads, widget }) {
  return <div>{home.map((block) => renderer(block, widget, ads, home))}</div>;
}

export async function getServerSideProps() {
  const [resHome, resAds, resWidget] = await Promise.all([
    axios.get(
      "https://strapi-production-b364.up.railway.app/views/631f8c2bb8a932ba47c1f4f2"
    ),
    axios.get("https://strapi-production-b364.up.railway.app/banners"),
    axios.get("https://strapi-production-b364.up.railway.app/widget-icons"),
  ]);

  const home = await resHome.data.Content;
  const ads = await resAds.data;
  
  const widget = await resWidget.data;

  return {
    props: {
      home,
      ads,
      widget,
    },
  };
}
