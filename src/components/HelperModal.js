import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { UploadFile, VpnKey, QuestionMark } from '@mui/icons-material';
import {styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const CssButton = styled(IconButton)({
  color: "white",
  border: "none",
  backgroundColor: "transparent",
  ':hover':{
    backgroundColor: "transparent",
    color:"black",
    border:"none"
  },
  ":hover .MuiSvgIcon-root": {
    color: "#2c313a"
  }
});


export default function HelperModal() {
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Tooltip title="Návod">
        <CssButton variant="outlined" onClick={handleClickOpen}>
          <QuestionMark/>
        </CssButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Návod použití</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            <Typography variant='h7' className='nadpis'>Přidávání adres</Typography>
            <Typography variant='body2' gutterBottom>
              Před tím, než mohou být extrahována data z webové stránky, musí být webové stránky přidány do seznamu.
              K tomu je určen panel označený "URL adresy". V tomto panelu se nachází vstupní pole, do kterého je třeba zadat URL adresu požadovaného webu.
            </Typography>
            <Typography variant='body2' gutterBottom>
            Mezi adresami je možné přepínat, případně je mazat. Přepnutí adresy má vliv na panely "Struktura webu" a "Výsledky"
            Jejich obsah se totiž mění na základě vybrané adresy.
            </Typography>

            <Typography variant='h7' className='nadpis'>Vyhledávací vzory</Typography>
            <Typography variant='body2' gutterBottom>
            Vyhledávací vzory, dále už jen patterny, slouží k vybírání prvků webové stránky. 
            Prvky se vybírají předevšík pomocí CSS selektoru. Pro jejich získání je vhodné používat panel pro vývojáře,
            který je součástí většiny moderních prohlížečů. Pro tyto účely je doporučeno používat prohlížeč Chrome.
            </Typography>

            <Typography variant='h7' className='nadpis'>Popis patternů</Typography>
            <Typography variant='body2' gutterBottom>
            Každý pattern by měl být v ideálním případě umístěn na samostatném řádku. 
            Je nutné, aby všechny patterny začínaly klíčovým slovem "select" a dvojtečkou.
            Za tímto řetězcem by měl být již umístěn právě CSS selector
            </Typography>
            <Typography variant='body2' gutterBottom>
            Každý prvek musí mít své jednoznačné označení. K tomu slouží řetězce <strong>"==="</strong>, případně 
            <strong>"===>"</strong>.
            Řetězec <strong>"==>"</strong> se používá ve chvíli, kdy CSS selectoru odpovídá více prvků a požadavkem je 
            získat hodnoty všech z nich. <strong>"==>"</strong> se používá právě tehdy, kdy jsou získávána data právě jediného prvku.
            Za každý z těchto řetězců je pak nutné umístit jednoznačné jméno prvku. 
            Každý pattern je nutné ukončit středníkem.
            </Typography>
            <Typography className='codeCSS' >
            select: title  === titulek;
            </Typography>
            <Typography className='codeCSS' >
            select: title  ==> titulek;
            </Typography>
            <Typography variant='h7' className='nadpis'>Typy exktrakce</Typography>
            <Typography variant='body2' gutterBottom>
            Nástroj umožňuje přistupovat k elementům webové stránky několika způsoby. 
            Ten nejzákladnější slouží k získávání celého elementu, včetně jeho tagů, atributů a textu.
            Dále je možné extrahovat jen vnitřní text elementu. K tomu slouží následující řetězec: 
            <strong>">>> text"</strong>, použitý takto: 
            </Typography>
            <Typography className='codeCSS' >
            select: title >>> text  ==> titulek;
            </Typography>
            <Typography variant='body2' gutterBottom>
            Dále je také možné získávat z elementů hodnoty jejich atributů. 
            K tomu slouží řetězec <strong>">>> atr()" </strong>, Ten má povinný vstupní parametr. Tím je název atributu.
            Jeho použítí je následující:
            </Typography>
            <Typography className='codeCSS' >
            select: title >>> atr(class)  ==> titulek;
            </Typography>
            <Typography variant='h7' className='nadpis'>Hromadná extrakce</Typography>
            <Typography variant='body2' gutterBottom>
            K extrakci většího množství dat slouží nástroj, který se spouští pomocí symbolu
            <UploadFile/>
            tento symbol se však zobrazí až po zadání patternu pro získání prvků.
            Po jeho spuštění se zobrazí formulář pro zadání mailové adresy a nahrání CSV souboru s URL adresami vybraných stránek.
            Adresy musí být umístěny v prvním sloupci, v každém řádku může být vždy jen jedna.
            Zpracovaná data jsou následně zaslána na zadaný mail ve formě JSONu a CSV souboru.
            </Typography>
            <Typography variant='h7' className='nadpis'>Proxy</Typography>
            <Typography variant='body2' gutterBottom>
            Některé weby mohou disponovat sofistikovanější ochranou proti web scrapingu. Pro zpracování těchto webů
            je vhodné využívat proxy adres. K jejich zadání slouží nástroj dostupný v panelu "Struktura webu" a 
            je označený symbolem <VpnKey/> Do tohoto formuláře je nutné zadat jednotlivé proxy adresy a následně odeslat
            ke zpracování.
            </Typography>

          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
