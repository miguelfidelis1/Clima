const apiKey = "bec0913246f90f8b5fe47c18962ed258";

async function buscarClima(){
    const cidade = document.getElementById("cidadeInput").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

 
try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (resposta.ok){
        const clima = dados.weather[0].description;
        const temperatura = dados.main.temp;
        const sensacao = dados.main.feels_like;
        const umidade = dados.main.humidity;

            document.getElementById("resultado").innerHTML = `
            <h2><b>🚩 Na cidade de ${cidade}</b></h2>
            <p><b>☁️ Clima: </b>${clima}</p>
            <p><b>⛅ Temperatura: </b> ${temperatura}°C</p>
            <p><b>🌡️ Sensação Térmica: </b> ${sensacao}°C</p>
            <p><b>💧 Umidade: </b> ${umidade}%</p>
            `;  

    } else {
        document.getElementById("resultado").innerHTML = `<p>Erro: ${dados.message}</p>`;
    }
 }  catch (erro) {
    document.getElementById("resultado").innerHTML = `<p>Erro ao buscar dados: ${erro}</p>`;
    console.error(erro);
 }

}   