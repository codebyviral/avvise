import { Navbar, Footer } from "../Components/compIndex";
import { About1, About2, About3 } from "../assets/URLs.js";
import founder from "../assets/viral.jpg";
const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <div className="container mx-auto py-12 px-6 lg:px-20">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            About AVVISE
          </h1>

          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row mb-8">
              <div className="lg:w-1/2 mb-6 lg:mb-0">
                <img
                  src={About1}
                  alt="Who We Are"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="lg:w-1/2 lg:pl-8">
                <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
                <p className="text-gray-700 mb-6">
                  AVVISE is an advanced grading app designed to streamline the
                  evaluation process for educators. Our platform provides
                  intuitive tools to manage and assess student performance
                  efficiently. We believe in leveraging technology to create a
                  seamless and user-friendly experience for educators.
                </p>
                <p className="text-gray-700 mb-6">
                  Founded by a team of passionate educators and tech
                  enthusiasts, AVVISE aims to bridge the gap between traditional
                  education methods and modern technological advancements. Our
                  goal is to make grading as easy and accurate as possible.
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse mb-8">
              <div className="lg:w-1/2 mb-6 lg:mb-0">
                <img
                  src={About2}
                  alt="Our Mission"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="lg:w-1/2 lg:pr-8">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-6">
                  Our mission is to revolutionize the education sector by
                  providing an innovative solution that simplifies grading. We
                  aim to save time and enhance accuracy, enabling educators to
                  focus more on teaching and less on administrative tasks.
                </p>
                <p className="text-gray-700 mb-6">
                  We are committed to continuous improvement and staying at the
                  forefront of educational technology. By listening to feedback
                  from our users and staying updated with the latest trends, we
                  ensure that AVVISE remains a valuable tool for educators
                  worldwide.
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row mb-8">
              <div className="lg:w-1/2 mb-6 lg:mb-0">
                <img
                  src={About3}
                  alt="Our Vision"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="lg:w-1/2 lg:pl-8">
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-gray-700 mb-6">
                  We envision a future where technology seamlessly integrates
                  with education to create a more efficient and effective
                  learning environment. AVVISE strives to be at the forefront of
                  this transformation, continually improving and adapting to
                  meet the needs of educators and students alike.
                </p>
                <p className="text-gray-700 mb-6">
                  Our vision is to create a world where educators have the best
                  tools at their disposal, allowing them to focus on what they
                  do best – teaching. We believe that by reducing the
                  administrative burden, we can help educators create more
                  impactful and engaging learning experiences for their
                  students.
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse mb-8">
              <div className="lg:w-1/2 mb-6 lg:mb-0">
                <img
                  src={founder}
                  alt="Our Team"
                  className="rounded-lg shadow-md h-500 w-500 lg:ml-20"
                />
              </div>
              <div className="lg:w-1/2 lg:pr-8">
                <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                <p className="text-gray-700 mb-6">
                  AVVISE is led by Viral Vaghela, the sole founder and a
                  passionate fullstack developer. With a commitment to
                  continuous learning and innovation, Viral works tirelessly to
                  create the best possible tools for education. Despite being a
                  team of one, AVVISE leverages {`Viral's`} diverse background
                  and expertise to understand and address the unique challenges
                  faced by students. The focus is on creating a collaborative
                  and inclusive environment where every effort contributes to
                  enhancing the platform.
                </p>
                <p className="text-gray-700 mb-6">
                  I, Viral Vaghela, am the founder of AVVISE and a passionate
                  fullstack developer. As the sole member of the AVVISE team, I
                  am dedicated to creating the best possible tools for
                  education. My diverse background and expertise enable me to
                  understand and address the unique challenges faced by
                  educators. I strive to foster a collaborative and inclusive
                  environment within AVVISE, where my efforts contribute to
                  continuous innovation and improvement.
                </p>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
              <p className="text-gray-700 mb-6">
                We are always looking for talented individuals who share our
                passion for education and technology. If you are interested in
                joining our team, please contact us at{" "}
                <a
                  href="mailto:viralvaghela.dev@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  viralvaghela.dev@gmail.com
                </a>
                .
              </p>
              <p className="text-gray-700">
                Together, we can make a difference in the world of education.
                Join us in our mission to create a better future for educators
                and students alike.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
