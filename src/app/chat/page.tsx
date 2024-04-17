import ChatHistory from "@/components/ChatHistory";
import ChatInput from "@/components/ChatInput";
import TreeJsSection from "@/components/TreeJsSection";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import Header_chat from "@/partials/Header_chat";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";

import dynamic from 'next/dynamic';

const DynamicChatInput = dynamic(() => import('@/components/ChatInput'), {
  ssr: false
});

const About = () => {
  const data: RegularPage = getListPage("about/_index.md");
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
  <div className="h-screen flex flex-col ">
    <Header_chat /> {/* Adjust the height as needed */}
    <div className="flex flex-1">
      <div className="flex-1 flex">
        <div className="p-2 w-1/3  ">
          <ChatInput />
        </div>
        <div className="w-2/3 p-4 ">
          <TreeJsSection />
        </div>
      </div>
    </div>
</div>

   

    </>
  );
};
About.layout = 'client';

export default About;
