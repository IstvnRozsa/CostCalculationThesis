from flask import Flask, render_template
import pandas as pd
import json

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def hello_world():  # put application's code here
    with open("data/1_Direkt_koltseg_dolgozo.json", 'r', encoding='utf-8') as file:
        direkt_dolgozo_js = json.load(file)

    with open("data/2_Direkt_koltseg_koltsegviselo.json", 'r', encoding='utf-8') as file:
        direkt_koltsegviselo_js = json.load(file)

    with open("data/3_Muvezetok_bere.json", 'r', encoding='utf-8') as file:
        muvezeto_js = json.load(file)

    with open("data/4_Egyeb_koltsegek.json", 'r', encoding='utf-8') as file:
        egyeb_js = json.load(file)

    with open("data/5_Osszesitett.json", 'r', encoding='utf-8') as file:
        osszesitett_js = json.load(file)


    return render_template('index.html',
                           direkt_dolgozo=direkt_dolgozo_js,
                           direkt_koltsegviselo=direkt_koltsegviselo_js,
                           muvezeto=muvezeto_js,
                           egyeb=egyeb_js,
                           osszesitett=osszesitett_js
                           )


if __name__ == '__main__':
    app.run()
