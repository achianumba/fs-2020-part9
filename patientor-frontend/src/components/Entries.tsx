import React from "react";
import { useStateValue } from "../state";
import { Entry } from "../types";

const Entries: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  const [{ diagnosis }] = useStateValue();

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
                  return (
                    code && (
                      <li key={i}>
                        {code}: {diagnosis[code]?.name}
                      </li>
                    )
                  );
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
