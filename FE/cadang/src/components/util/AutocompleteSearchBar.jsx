import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { margin } from "@mui/system";

function AutocompleteSearchBar (props) {
    return (
        <Autocomplete
              id="highlights-demo"
              sx={{ width: "100%", margin: 0}}
              options={props.data}
              getOptionLabel={(option) => option.title}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label={props.label} margin="normal" />
              )}
              renderOption={(props, option, { inputValue }) => {
                const matches = match(option.title, inputValue, {
                  insideWords: true,
                });
                const parts = parse(option.title, matches);

                return (
                  <li {...props}>
                    <div>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              }}
            />
    )
}

export default AutocompleteSearchBar;