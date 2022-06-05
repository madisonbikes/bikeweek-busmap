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
      <div>{busList}</div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div>
        <a
          href="https://github.com/madisonbikes/bikeweek-busmap"
          target="_blank"
          rel="noreferrer"
        >
          Github Code
        </a>
      </div>
    </div>
  );
};
