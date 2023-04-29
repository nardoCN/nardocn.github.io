import PagesScroller from "../components/page-scroller";
import PageScroller from "../components/page-scroller/components/page";
import ContactSection from "../components/sections/contact-section";
import HaloSection from "../components/sections/halo-section";
import ProjectsSection from "../components/sections/projects-section";
import SkillsSection from "../components/sections/skills-section";
import WorksSection from "../components/sections/works-section";

export default function Home() {
    return (
        <div className="sections">
            <PagesScroller 
                pageJump={{percentToJump: 40}}
                onScroll={(page, y, height) => {
                    // console.log('onScroll', page, y, height);
                }}
                onNext={(page, y, height) => {
                    // console.log('onNext', page, y, height);
                }}
                onPrev={(page, y, height) => {
                    // console.log('onPrev', page, y, height);
                }}>
                <PageScroller>
                    <HaloSection />
                </PageScroller>
                <PageScroller>
                    <WorksSection />
                </PageScroller>
                <PageScroller>
                    <ProjectsSection />
                </PageScroller>
                <PageScroller>
                    <SkillsSection />
                </PageScroller>
                <PageScroller>
                    <ContactSection />
                </PageScroller>
            </PagesScroller>
        </div>
    )
}