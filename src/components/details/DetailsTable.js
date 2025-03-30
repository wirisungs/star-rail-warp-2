import { useContext } from "react";
import ResizeContext from "../context/ResizeContext";
import Table from "react-bootstrap/Table";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
const trans = require("../../assets/data/translations.json");

const DetailsTable = ({ items, rateUp = [], type }) => {
  const { getWidth } = useContext(ResizeContext);
  const { i18n } = useTranslation();

  const tableItem = rateUp.concat(items).map((item, index) => {
    if (!items[Math.floor(index / 4) * 4]) return null;

    return (
      <tr key={item + index} style={{ fontSize: getWidth(14, 10) }}>
        {index < Math.ceil(items.length / 4) ? (
          <>
            <td
              className="w-25"
              style={{
                fontSize: getWidth(22, 6),
                verticalAlign: "middle",
                color: "#767676",
              }}
            >
              {rateUp.includes(items[index * 4]) && items[index * 4] ? (
                <>
                  <LazyLoadImage
                    alt="Rate Up Icon"
                    effect="opacity"
                    src="../assets/details/rate-up.webp"
                    width={12}
                  />
                  {trans[items[index * 4]]?.[i18n.resolvedLanguage] || items[index * 4]}
                </>
              ) : items[index * 4] ? (
                trans[items[index * 4]]?.[i18n.resolvedLanguage] || items[index * 4]
              ) : null}
            </td>
            <td
              className="w-25"
              style={{
                fontSize: getWidth(22, 6),
                verticalAlign: "middle",
                color: "#767676",
              }}
            >
              {rateUp.includes(items[index * 4 + 1]) && items[index * 4 + 1] ? (
                <>
                  <LazyLoadImage
                    alt="Rate Up Icon"
                    effect="opacity"
                    src="../assets/details/rate-up.webp"
                    width={12}
                  />
                  {trans[items[index * 4 + 1]]?.[i18n.resolvedLanguage] || items[index * 4 + 1]}
                </>
              ) : items[index * 4 + 1] ? (
                trans[items[index * 4 + 1]]?.[i18n.resolvedLanguage] || items[index * 4 + 1]
              ) : null}
            </td>
            <td
              className="w-25"
              style={{
                fontSize: getWidth(22, 6),
                verticalAlign: "middle",
                color: "#767676",
              }}
            >
              {rateUp.includes(items[index * 4 + 2]) && items[index * 4 + 2] ? (
                <>
                  <LazyLoadImage
                    alt="Rate Up Icon"
                    effect="opacity"
                    src="../assets/details/rate-up.webp"
                    width={12}
                  />
                  {trans[items[index * 4 + 2]]?.[i18n.resolvedLanguage] || items[index * 4 + 2]}
                </>
              ) : items[index * 4 + 2] ? (
                trans[items[index * 4 + 2]]?.[i18n.resolvedLanguage] || items[index * 4 + 2]
              ) : null}
            </td>
            <td
              className="w-25"
              style={{
                fontSize: getWidth(22, 6),
                verticalAlign: "middle",
                color: "#767676",
              }}
            >
              {rateUp.includes(items[index * 4 + 3]) && items[index * 4 + 3] ? (
                <>
                  <LazyLoadImage
                    alt="Rate Up Icon"
                    effect="opacity"
                    src="../assets/details/rate-up.webp"
                    width={12}
                  />
                  {trans[items[index * 4 + 3]]?.[i18n.resolvedLanguage] || items[index * 4 + 3]}
                </>
              ) : items[index * 4 + 3] ? (
                trans[items[index * 4 + 3]]?.[i18n.resolvedLanguage] || items[index * 4 + 3]
              ) : null}
            </td>
          </>
        ) : null}
      </tr>
    );
  });

  return (
    <section>
      <Table bordered className="m-0">
        <thead style={{ fontSize: getWidth(14, 10) }}>
          <tr>
            <th
              colSpan={4}
              style={{
                backgroundColor: "#e7e7e7",
                color: "#9d8463",
                fontSize: getWidth(26, 12),
              }}
            >
              {type}
            </th>
          </tr>
        </thead>
        <tbody>{tableItem}</tbody>
      </Table>
    </section>
  );
};

export default DetailsTable;
