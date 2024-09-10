import { Navbar, Footer } from "../Components/compIndex";
import AboutTeam from "../Components/AboutTeam";
import { Link } from "react-router-dom";
const About = () => {
  const oldAvvise = "https://gradiebuddyold.netlify.app";
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <div className="container mx-auto py-12 px-6 lg:px-20">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            About AVVISE
          </h1>
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 lg:p-16">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                {`Avvise's`} Journey
              </h2>
              <span className=" cursor-pointer">
                {" "}
                <br /> AVVISE was previously known as GradieBuddy. Later it has
                been updated to AVVISE.{" "}
                <span className="underline">
                  <Link to={oldAvvise}>View Old AVVISE 🙈</Link>
                </span>
              </span>{" "}
              <br /> <br />
              <p className="text-gray-700 mb-6">
                AVVISE began with a simple yet profound vision: to bridge the
                gap between traditional educational practices and the vast
                potential of modern technology. Founded by Viral Vaghela, a
                dedicated Fullstack developer, the journey started from a shared
                frustration among educators: the time-consuming and often
                daunting task of grading. Inspired by the belief that technology
                could revolutionize education, Viral set out to design a grading
                app that would simplify this process. Our journey has been one
                of constant learning, adapting, and improving based on the needs
                of educators and students around the globe.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Purpose and Goals</h2>
              <p className="text-gray-700 mb-6">
                At the heart of AVVISE lies our commitment to transforming the
                educational landscape. Our primary purpose is to provide
                educators with an innovative tool that streamlines the grading
                process, allowing them to save precious time while grading
                multiple-choice questions (MCQs). By automating evaluations, we
                empower educators to dedicate more time to teaching and engaging
                with their students. Our overarching goal is to make grading
                accurate, efficient, and hassle-free, ensuring that both
                educators and students can focus on what truly matters—learning.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                Introduction to the Team
              </h2>
              <p className="text-gray-700 mb-6">
                AVVISE operates as a one-person team, led by its founder, Viral
                Vaghela. With a robust skill set in fullstack development and an
                unwavering passion for education, Viral wears many hats in this
                project—developer, designer, and educator. Although the team may
                be small, it is driven by a vision of inclusivity and continuous
                improvement. Viral actively seeks feedback from educators and
                students alike, using their insights to refine the app further
                and ensure it meets the diverse needs of its users.
                Collaboration, innovation, and a deep understanding of
                educational challenges are the cornerstone of our approach.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Offerings</h2>
              <p className="text-gray-700 mb-6">
                AVVISE is proud to offer a user-friendly web app specifically
                designed for automating the grading of multiple-choice
                questions. Our platform delivers quick, accurate, and reliable
                evaluations, which enable educators to provide immediate and
                meaningful feedback to their students. By minimizing the
                administrative workload associated with grading, AVVISE allows
                educators to refocus their energy on what they do best—mentoring
                and teaching. With features tailored to enhance the educational
                experience, our app stands as a valuable asset in any{" "}
                {`educator's`}
                toolkit.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Customer Opinions</h2>
              <p className="text-gray-700 mb-6">
                We believe that our users are our greatest advocates. Feedback
                from educators who have embraced AVVISE has been overwhelmingly
                positive. Many highlight how the app has revolutionized their
                grading process, saving them countless hours and allowing them
                to engage more deeply with their students. Testimonials reflect
                a common sentiment: that AVVISE has not only simplified grading
                but has also enriched the educational experience by providing
                timely feedback. We cherish these reviews, as they guide our
                continuous improvement efforts and inspire us to serve educators
                better.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
              <p className="text-gray-700 mb-6">
                Since our inception, AVVISE has made significant strides in
                enhancing the educational technology landscape. We have
                successfully automated the grading process for thousands of
                multiple-choice questions, receiving various accolades for our
                innovative approach. Our commitment to excellence and
                responsiveness to user feedback has allowed us to implement
                continuous updates and feature enhancements, affirming our
                position as a trusted resource for educators. Each success is a
                testament to our dedication to fostering an environment where
                technology and education thrive together.
              </p>
            </section>

            <section className="mb-12 text-center">
              <h2 className="text-2xl font-semibold mb-4">Call to Action</h2>
              <p className="text-gray-700 mb-6">
                As we continue to grow and innovate, we invite you to join us on
                this exciting journey. If you share our passion for education
                and technology, we would love to hear from you. Whether you’re
                an educator, a tech enthusiast, or someone interested in
                contributing to our mission, your voice matters. Please reach
                out to us at{" "}
                <a
                  href="mailto:viralvaghela.dev@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  viralvaghela.dev@gmail.com
                </a>{" "}
                to discover how you can be a part of AVVISE. Together, we can
                make a meaningful difference in the world of education,
                empowering educators and students alike to reach their fullest
                potential.
              </p>
            </section>
          </div>
        </div>
      </div>
      <AboutTeam />
      <Footer />
    </>
  );
};

export default About;
