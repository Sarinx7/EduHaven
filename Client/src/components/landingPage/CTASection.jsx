import { Github, Play, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto p-12">
          <h2 className="text-4xl font-semibold font-poppins mb-2">
            Ready to transform your learning journey?
          </h2>
          <p className="text-xl mb-12 txt-dim">
            Join thousands of students who are staying organized, motivated, and
            achieving their academic goals with EduHaven.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/authenticate")}
              variant="primary"
              size="lg"
              className="flex items-center space-x-3 font-semibold text-lg"
              motionProps={{
                initial: { opacity: 0, y: 20, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] },
                whileHover: {scale: 1.04},
                whileTap: {},
              }}
            >
              <Play size={20} />
              <span>Get Started for Free</span>
            </Button>

            <Button
              asChild
              variant="secondary"
              size="lg"
              className="flex items-center space-x-3 font-semibold text-lg border-2"
              style={{ borderColor: "var(--btn)", color: "var(--btn)" }}
              motionProps={{
                initial: { opacity: 0, y: 20, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                whileHover: { rotate: -2 },
                whileTap: { scale: 0.97 },
              }}
            >
              <a
                href="https://github.com/Eduhaven/eduhaven"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
                <span>View on GitHub</span>
              </a>
            </Button>
          </div>

          <div className="mt-8 flex justify-center">
            <div
              className="flex items-center space-x-6 text-sm"
              style={{ color: "var(--txt-dim)" }}
            >
              <div className="flex items-center space-x-2">
                <Check size={16} className="text-green-500" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check size={16} className="text-green-500" />
                <span>Open source</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check size={16} className="text-green-500" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
