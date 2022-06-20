/*
 * Copyright (c) Madison Bikes and Ben Sandee (tbsandee@orangebikelabs.com) 2021.
 */

import { Map } from "./Map";
import { Configuration } from "../Configuration";
import { Entity } from "../api/Types";

type Props = {
  configuration: Configuration;
  buses: Entity[];
};

export const MapLoader = ({ configuration, buses }: Props) => {
  return (
    <div className="Map">
      <Map configuration={configuration} buses={buses} />
    </div>
  );
};
