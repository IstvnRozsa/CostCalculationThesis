from flask import Flask, render_template
import pandas as pd
import json

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def hello_world():  # put application's code here
    with open("data/1_Direkt_koltseg_dolgozo.json", 'r', encoding='utf-8') as file:
        direct_employee_js = json.load(file)

    with open("data/2_Direkt_koltseg_koltsegviselo.json", 'r', encoding='utf-8') as file:
        direct_costholder_js = json.load(file)

    with open("data/3_Muvezetok_bere.json", 'r', encoding='utf-8') as file:
        prodleader_js = json.load(file)

    with open("data/4_Egyeb_koltsegek.json", 'r', encoding='utf-8') as file:
        other_js = json.load(file)

    with open("data/5_Osszesitett.json", 'r', encoding='utf-8') as file:
        summarized_js = json.load(file)


    return render_template('index.html',
                           direct_employee=direct_employee_js,
                           direct_costholder=direct_costholder_js,
                           prodleader=prodleader_js,
                           other=other_js,
                           summarized=summarized_js
                           )


if __name__ == '__main__':
    app.run()
