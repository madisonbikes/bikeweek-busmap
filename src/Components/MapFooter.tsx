import { Configuration } from "../Configuration";

type Props = {
  configuration: Configuration;
};

export const MapFooter = ({ configuration }: Props) => {
  let busList = "";
  for (const b of configuration.busIds) {
    if (busList.length > 0) {
      busList += ", ";
    } else {
      busList += "Tracking Bus Numbers ";
    }
    busList += `${b}`;
  }
  return (
    <div className="Footer">
      <div className="FooterBusList">{busList}</div>
      <div>
        <a
          href="https://github.com/madisonbikes/bikeweek-busmap"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </div>
  );
};
