import React  from 'react';
import { AppBar, Toolbar, Typography, Button, Card, CardHeader, CardContent, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import SearchIcon from '@mui/icons-material/Search';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import unique from 'unique-selector';
import ProxyModal from "./ProxyModal";


const StyledToolbar = styled(Toolbar)({
 dispaly: "flex",
 justifyContent: "space-between"
});

const Structure = ({HTMLresponse}) => {
    const [selection, setSelection] = useState("");


        const elemToSelector = (elem) => {

        if(elem){
            let {
              tagName,
              id,
              className,
              parentNode
            } = elem;
          
            if (tagName === 'HTML') return 'HTML';
          
            let str = tagName;
          
            str += (id !== '') ? `#${id}` : '';
          
            if (className) {
              let classes = className.split(/\s/);
              for (let i = 0; i < classes.length; i++) {
                str += `.${classes[i]}`;
              }
            }
          
            let childIndex = 1;
          
            for (let e = elem; e.previousElementSibling; e = e.previousElementSibling) {
              childIndex += 1;
            }
          
            str += `:nth-child(${childIndex})`;
          
            return `${elemToSelector(parentNode)} > ${str}`;
          }
        }


    const handleSelect = () =>{
        let count
        count = (HTMLresponse[0].html.match(new RegExp(selection, "g")) || []).length
        if(count == 1)
        {
            let frag = document.createRange().createContextualFragment(selection);
            let allDivs = frag.querySelectorAll('*');  
            let parent = frag.querySelector(allDivs[0].nodeName)
            parent.setAttribute("class", "searchPattern")
            let div=document.createElement("div");
                div.appendChild(frag);
            let text = div.innerHTML;
            let html = HTMLresponse[0].html.replace(selection, text)
            console.log(html)
            let div2 = document.createElement('DIV');
            div2.innerHTML = html
            console.log(div2)
            let newClass = div2.getElementsByClassName("searchPattern")
            let result = elemToSelector(newClass[0])
            console.log(result)
        }
      }

    return (
        <Card elevation={3}>
            <CardHeader
             title="Structure"
 //            action={<Button type="submit" onClick={() => handleSelect()} startIcon={<SearchIcon/>}></Button>}
               action={<ProxyModal/>}
             />
            <Divider/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" style={{maxHeight: '700px', overflow: 'auto'}}>
                    {HTMLresponse[0] &&       
                    <CodeMirror
                    value= {HTMLresponse[0].html}
                    height="100%"
                    theme={oneDark}
                    editable={false}
                    onUpdate={(viewUpdate) => {
                        let start = viewUpdate.state.selection.ranges[0].from
                        let end = viewUpdate.state.selection.ranges[0].to
                        setSelection(HTMLresponse[0].html.substring(start,end))
                      }}

                    />}
                </Typography>                
            </CardContent>
        </Card>
    )
};

export default Structure;