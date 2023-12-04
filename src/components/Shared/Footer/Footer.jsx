import FooterBg from "../../../assets/footer-bg.jpg";
import Logo from "../../../assets/Logo.png";
import Container from "../Container";

const Footer = () => {
  return (
    <footer
      style={{
        background: `linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${FooterBg}) center/cover no-repeat`,
      }}
      className="w-full py-12 mt-12"
    >
      <Container px="5%">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-10">
          <img
            src={Logo}
            alt="cineflex logo"
            className="col-span-3 sm:col-span-1 w-40"
          />
          <div className="col-span-1 text-sm flex flex-col gap-y-1">
            <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">FAQ</a>
            <a href="#">Get Started</a>
            <a href="#">Videos</a>
          </div>
          <div className="col-span-1 text-sm flex flex-col gap-y-1">
            <h4 className="font-semibold text-lg mb-2">Legal</h4>
            <a href="#">Terms of use</a>
            <a href="#">Privacy policy</a>
            <a href="#">Cookie policy</a>
          </div>
          <div className="col-span-1 text-sm flex flex-col gap-y-1">
            <h4 className="font-semibold text-lg mb-2">Social</h4>
            <a href="#">IMDB</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Youtube</a>
          </div>
          <div className="col-span-3 sm:col-span-4 text-center text-sm">
            Copyright &copy;2023 All rights reserved | This template is made by{" "}
            <a href="#" className="text-[#f98616]">
              Rouf Hasan Hridoy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
