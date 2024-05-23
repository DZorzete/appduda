import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import Option from "./src/components/Option";
import { useEffect, useState } from "react";
import { quizData } from "./src/data/questions";
import Results from "./src/components/Results";

export default function App() {
  
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [verificaSelecao, setVerificaSelecao] = useState({option1: false, option2: false, option3: false, option4: false});
  const [porcentagemCompleta, setPorcentagemCompleta] = useState(0)
  

  useEffect(() => {
    setQuestions(quizData)
  }, [])

  useEffect(() => {
    let porcentagem = (perguntaAtual + 1) * 10
    setPorcentagemCompleta(porcentagem)
  }, [index]);

  let perguntaAtual = questions[index];

  const proximaPergunta= () => {
    let respostaCorreta = questions[index]?.resposta;
    if (opcaoSelecionada == respostaCorreta) {
      setScore((prevScore) => prevScore + 1);
    }
    if (index < questions?.length - 1) {
      setIndex((prevQuestion) => prevQuestion + 1);
    } else {
      setMostrarResultado(true);
    }
    setVerificaSelecao(({option1: false, option2: false, option3: false, option4: false}))
  }

  const primeiraAlternativa = () => {
    setVerificaSelecao({option1: true, option2: false, option3: false, option4: false});
  }
  const segundaAlternativa = () => {
    setVerificaSelecao({option1: false, option2: true, option3: false, option4: false});
  }
  const terceiraAlternativa = () => {
    setVerificaSelecao({option1: false, option2: false, option3: true, option4: false});
  }
  const quartaAlternativa = () => {
    setVerificaSelecao({option1: false, option2: false, option3: false, option4: true});
  }
  const reiniciar = () => {
    setScore(0);
    setIndex(0);
    setMostrarResultado(false);
  }
  if (mostrarResultado) return <Results  reiniciar={reiniciar} score={score}/>

  return (
    <View style={styles.container}>
      <StatusBar styles="auto" />
      <SafeAreaView>
        {/* Contador */}
        <View style={style = styles.countWrapper} >
          <Text style={styles.countText} >{index + 1}/{questions?.length}</Text>
        </View>
        <Image 
          source={require('./assets/logo.png')}
          // resizeMode="contain"
          style={styles.image}
        />
        {/* Questão */}
        <View style={styles.questionWrapper} >
          <Text style={styles.questionText}  >
            {perguntaAtual?.pergunta}
          </Text>
        </View>
        {/* Opções */}
        <View style={styles.optionsWrapper} >
          <Option setOpcaoSelecionada={setOpcaoSelecionada} verificaSelecao={primeiraAlternativa} isSelected={verificaSelecao?.option1} option={perguntaAtual?.options[0]}/>
          <Option setOpcaoSelecionada={setOpcaoSelecionada} verificaSelecao={segundaAlternativa} isSelected={verificaSelecao?.option2} option={perguntaAtual?.options[1]}/>
          <Option setOpcaoSelecionada={setOpcaoSelecionada} verificaSelecao={terceiraAlternativa} isSelected={verificaSelecao?.option3} option={perguntaAtual?.options[2]}/>
          <Option setOpcaoSelecionada={setOpcaoSelecionada} verificaSelecao={quartaAlternativa} isSelected={verificaSelecao?.option4} option={perguntaAtual?.options[3]}/>
        </View>
        {/* Próxima pergunta */}
        <TouchableOpacity onPress={proximaPergunta} activeOpacity={.8} style={styles.button}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e4e4",
    padding: 20,
  },
  countWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  countText: {
    fontWeight: "600",
    fontSize: 20
  },
  questionWrapper: {
    marginTop: 60,
    width: "100%",
    height: 180,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    alignItems: "center",
  },
  questionText: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 26,
    marginHorizontal: 10,
  },
  optionsWrapper: {
    marginTop: 40,
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 16,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  image: {
    height:80, 
    width:80, 
    alignSelf:"center"
  }
});