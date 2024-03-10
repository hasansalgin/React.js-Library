import axios from "axios";
import { createContext, useEffect, useReducer} from "react";
import { initalState, reducer } from "../reducer/reducer";
import { Bounce, toast } from "react-toastify";


//context oluşturulması
const DataContext = createContext();

//oluşturulan contexte bir sağlayıcı oluşturulur
export const DataProvider = ({children})=>{
    //Yapıdaki tüm state,methot,etc taşınacak!
    const[state,dispatch] = useReducer(reducer,initalState);
  
    //yeni kitap ekleme/düzenleme
    const yeniKitapEkleDuzenle = async (yeni)=>{
      //kitap ekleme için
      let url = "http://localhost:3005/kitaplar";
      if(!state.secilenKitap){
        //case-6
        dispatch({type:"kitapEkle",yeni})
        const response = await axios.post(url,yeni);
        console.log(response);
        toast.success('Yeni Kitap Eklendi!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
      }
      //kitap düzenlemek için
      else{
        url+=`/${state.secilenKitap.id}`;
        const response2 = await axios.put(url,yeni)
        //case-7
        dispatch({type:"kitapDuzenle",yeni})
        toast.warn('🦄 Kitap Düzenlendi!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
      }
    }
    //kitap silme
    const kitapSil = async (id)=>{
      //case-5
      // dispatch({type:"kitapSil",id})
      const url = `http://localhost:3005/kitaplar/${id}`;
      const response = await axios.patch(url,{isDeleted:true})
      console.log(response);
      toast.error('Kitap Silindi!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }
    //kitapları getirme
    const kitapGetir = async ()=>{
        let url = "http://localhost:3005/kitaplar";
        if(state.secilenKategori && state.secilenKategori !== "Tüm Kitaplar"){
          url +=`?kitapKategorisi=${state.secilenKategori}`;
        }
  
        const response = await fetch(url);
        const kitaplar = await response.json();
        //case-1
        // kitaplar:kitaplar === kitaplar
        dispatch({type:"kitaplariGetir",payload:kitaplar})
    }
    //kategorileri getir
    const kategoriGetir = async ()=>{
      const url = "http://localhost:3005/kategoriler";
      const response = await fetch(url);
      const kategoriler = await response.json();
      //case-2
      dispatch({type:"kategorileriGetir",payload:kategoriler});
    }
    //carddaki düzenle
    const cardDuzenle = async (id)=>{
        const url = `http://localhost:3005/kitaplar/${id}`;
        const response = await axios.get(url);
        const duzenlenecekKitap = response.data
        //case-4
        dispatch({type:"cardDuzenle",duzenlenecekKitap});
    }
    //Form Submit
    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log("Kitap Başarıyla Eklendi/Düzenlendi!");
      yeniKitapEkleDuzenle({
        id: state.secilenKitap.id??(state.kitaplik.length+1).toString(),
        // id: state.kitaplik.length>0 ? (+state.kitaplik[state.kitaplik.length-1].id+1).toString():"1",
        kitapAdi: state.kitapAdi,
        kitapYazari: state.kitapYazari,
        kitapKategorisi: state.kitapKategorisi,
        kitapResmi: state.kitapResmi,
        kitapSayfaSayisi: state.kitapSayfaSayisi,
        kitapAciklamasi: state.kitapAciklamasi
      });
      //case-3
      dispatch({type:"formReset"})
    }


    // useEffect(()=>{
    //   if(secilenKitap){
    //     setKitapAdi(secilenKitap.kitapAdi);
    //     setKitapYazari(secilenKitap.kitapYazari);
    //     setKitapKategorisi(secilenKitap.kitapKategorisi);
    //     setKitapResmi(secilenKitap.kitapResmi);
    //     setKitapSayfaSayisi(secilenKitap.kitapSayfaSayisi);
    //     setKitapAciklamasi(secilenKitap.kitapAciklamasi);
    //   }
    // },[secilenKitap])

    useEffect(()=>{
      kategoriGetir();
    },[])

    useEffect(()=>{
      kitapGetir();
    },[state.secilenKategori,state.kitaplik])
    


    return  <DataContext.Provider value={
        {
           kitapSil,cardDuzenle,
           handleSubmit,state,dispatch 
        }
    }>
                    {children}
            </DataContext.Provider>
}

export default DataContext;