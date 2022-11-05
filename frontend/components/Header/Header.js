import Flex from "../Flex/Flex";
import Image from "../Image/Image";
import Text from "../Text/Text";
import { spacing } from "../../theme";

const Header = ({ height = spacing["2"], ...props }) => {
  return (
    <Flex
      p={`${spacing["0.75"]} ${spacing["2"]}`}
      gap={spacing["0.25"]}
      {...props}
    >
      <Image
        src="/DU-Logo-Mark.svg"
        alt="capstone-logo"
        width={height}
        height={height}
      />
      <Text lineHeight={height}>Kobi&apos;s Capstone Project</Text>
    </Flex>
  );
};

export default Header;
