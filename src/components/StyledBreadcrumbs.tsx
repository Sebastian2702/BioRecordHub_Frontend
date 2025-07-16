import { Breadcrumbs, Link, Typography } from "@mui/material";
import {COLORS, FONT_SIZES} from '../constants/ui.ts';
import {formatLabel} from "../utils/helperFunctions.ts";

interface StyledBreadcrumbs {
    data: { label: string; link?: string }[];
}

const taxonomyFields = [
    'kingdom', 'phylum', 'subphylum', 'class', 'order', 'suborder',
    'infraorder', 'superfamily', 'family', 'subfamily', 'tribe',
    'genus', 'subgenus', 'species', 'subspecies'
];


const StyledBreadcrumbs: React.FC< StyledBreadcrumbs> = ({ data }) => {
    return (
        <Breadcrumbs
            sx={{
                flexWrap: "wrap",
                wordBreak: "break-word",
                lineHeight: 1.5,
                maxWidth: "100%",
                fontSize: FONT_SIZES.small,
            }}
        >
            {taxonomyFields.map((field) => {
                const value = data[field];
                if (!value) return null;

                return (
                    <Link
                        underline="hover"
                        color={COLORS.primary}
                        href={`/nomenclature_search/${field}/${value}`}
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <strong>{formatLabel(field)}:</strong>&nbsp;
                        <Typography component="span" variant="body2" color="inherit">
                            {value}
                        </Typography>
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};
export default StyledBreadcrumbs;