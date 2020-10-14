import React from "react";
import { Entry } from "../types";

const Entries: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  if (!entries) {
    return <></>;
  }

  return (
    <>
      {entries.map(({ date, description, diagnosisCodes }, i) => {
        return (
          <React.Fragment key={i}>
            {date && (
              <p>
                <strong>{date}</strong>
              </p>
            )}
            {description && (
              <p>
                <strong>Description: </strong>
                {description}
              </p>
            )}
            {diagnosisCodes && diagnosisCodes?.length > 0 && (
              <ul>
                {diagnosisCodes.map((code, i) => {
                  return code && <li key={i}>{code}</li>;
                })}
              </ul>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Entries;
