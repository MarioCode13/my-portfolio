import React from 'react';
import './main-article-anim.css';

interface MainProps {
  isArticleVisible: boolean;
  timeout: boolean;
  articleTimeout: boolean;
  article: string;
  onCloseArticle: () => void;
  setWrapperRef: (node: HTMLDivElement | null) => void;
}

const Main: React.FC<MainProps> = ({ isArticleVisible, timeout, articleTimeout, article, onCloseArticle, setWrapperRef }) => {
  const close = (
    <button className="close" onClick={onCloseArticle} aria-label="Close">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="4" y1="4" x2="16" y2="16" />
        <line x1="16" y1="4" x2="4" y2="16" />
      </svg>
    </button>
  );

  // Helper to get animation classes
  const getArticleClass = (id: string) => {
    let base =
      'main-article';
    if (article === id && articleTimeout) {
      base += ' main-article-active';
    } else if (article === id) {
      base += ' main-article-preactive';
    } else if (articleTimeout) {
      base += ' main-article-timeout';
    } else {
      base += ' hidden';
    }
    return base;
  };

  // Prevent modal click from closing
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Backdrop for frosted glass effect, closes modal on click */}
      <div
        className={`main-backdrop${timeout ? ' active' : ''}`}
        onClick={onCloseArticle}
        aria-hidden="true"
        style={{ zIndex: 20 }}
      />
      <div
        ref={setWrapperRef}
        id="main"
        className={timeout ? 'fixed inset-0 flex items-center justify-center w-full min-h-screen z-30 pointer-events-none' : 'hidden'}
      >
        <div className="relative pointer-events-auto w-full max-w-2xl mx-auto">
          {/* Intro Article */}
          <article id="intro" className={getArticleClass('intro')} onClick={handleModalClick}>
            <h2 className="major text-2xl font-bold mb-4">Intro</h2>
            <span className="image main block mb-4">
              <img src="/assets/intro.jpg" alt="About" className="rounded w-full" />
            </span>
            <p className="mb-2">Hi, I'm Mario. I'm a software developer building robust, user-focused digital solutions. I have experience developing a broad range of applications, from client-facing products to internal admin dashboards, with a focus on creating intuitive experiences and scalable architectures.</p>
            <p className="mb-2">Primarily working with:</p>
            <ul className="list-disc list-inside mb-2">
              <li>React</li>
              <li>React Native</li>
              <li>Typescript</li>
              <li>GraphQL</li>
              <li>Java (Spring Boot)</li>
              <li>Postgres</li>
            </ul>
            <p className="mb-2">I'm passionate about bringing ideas to life — translating concepts into real, working products that provide value to users and businesses alike. I'm at my best when working on projects that challenge me to think critically, solve problems creatively, and deliver polished, maintainable solutions.</p>
            <p className="mb-2">My ambition is to continue crafting seamless digital experiences across web and mobile platforms, while deepening my expertise across the full stack to deliver end-to-end solutions.</p>
            <p>Have a look at some of my <a href="/work" className="text-blue-500 underline">work</a>.</p>
            {close}
          </article>
          {/* Work Article */}
          <article id="work" className={getArticleClass('work')} onClick={handleModalClick}>
            <h2 className="major text-2xl font-bold mb-4">Work</h2>
            <span className="image main block mb-4">
              <img src="/assets/work.jpg" alt="Work" className="rounded w-full" />
            </span>
            <p className="mb-2">Over the course of my career, I've worked across a variety of web-based and mobile-based solutions — from building marketing websites to developing full-scale applications with complex user flows and backend integrations.</p>
            <p className="mb-2">I'm passionate about continuous learning, refining my craft, and exploring new technologies through hands-on projects. Experimentation, side projects, and staying current with best practices all play a big role in how I grow and approach new challenges.</p>
            <p>You can find a more detailed overview of the projects I've worked on <a href="/work" className="text-blue-500 underline">here</a>.</p>
            {close}
          </article>
          {/* About Article */}
          <article id="about" className={getArticleClass('about')} onClick={handleModalClick}>
            <h2 className="major text-2xl font-bold mb-4">About</h2>
            <span className="image main block mb-4">
              <img src="/assets/about2.jpg" alt="About" className="rounded w-full" />
            </span>
            <p className="mb-2">With a background in both creative and technical fields, I bring a well-rounded approach to software development. My passion for building intuitive user experiences is rooted in a lifelong love of creativity — shaped through music, and later expanded into design and technology.</p>
            <p className="mb-2">I have a Bachelor of Commerce degree from the University of South Africa, with a double major in Information Systems and Business Management. While working in marketing and supporting web development initiatives, I discovered my passion for programming and shifted my career focus toward building digital solutions.</p>
            <p className="mb-2">Today, I work on a broad range of projects including web applications, client-facing products, and internal administration systems — leveraging both frontend and backend technologies to deliver complete solutions.</p>
            <p>You can explore some of my work <a href="/work" className="text-blue-500 underline">here</a>.</p>
            {close}
          </article>
          {/* Contact Article */}
          <article id="contact" className={getArticleClass('contact')} onClick={handleModalClick}>
            <h2 className="major text-2xl font-bold mb-4">Contact</h2>
            <form method="POST" name="contact" data-netlify="true" className="mb-4">
              <div className="flex flex-wrap gap-4 mb-2">
                <div className="flex-1 min-w-[120px]">
                  <label htmlFor="name" className="block text-gray-700">Name</label>
                  <input type="text" name="name" id="name" className="w-full border rounded px-2 py-1" />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <input type="text" name="email" id="email" className="w-full border rounded px-2 py-1" />
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="message" className="block text-gray-700">Message</label>
                <textarea name="message" id="message" rows={4} className="w-full border rounded px-2 py-1"></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="gotcha" className="hidden">Gotcha</label>
                <input id="gotcha" type="text" name="_gotcha" className="hidden" />
              </div>
              <div className="flex gap-2">
                <input type="submit" value="Send Message" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" />
                <input type="reset" value="Reset" className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer" />
              </div>
            </form>
            <ul className="flex gap-4 justify-center">
              <li>
                <a href="https://github.com/MarioCode13" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mario-liebenberg/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">LinkedIn</a>
              </li>
            </ul>
            {close}
          </article>
        </div>
      </div>
    </>
  );
};

export default Main; 