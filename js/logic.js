/*DEATH TO QUIZLET AND BIG DATA*/
/*SO LET'S ABUSE THE URL size */
"use strict";

Vue.component("notecard-input", {
  props: ["card"],
  data: function() {
    return {
      max_def: 280,
      max_term: 144,
      notecard_rows: 5,
      notecard_cols: 25
    };
  },
  template: `
    <div class="card content box" key="card.term">
        <span class="card-content">
          <div class="columns">
              <strong class="column is-3">Term:</strong>
              <div class="column">
                <textarea class="textarea has-fixed-size" rows="1" cols="10" :maxlength=max_term v-model="card['term']"></textarea>
              </div>
          </div>
          <div class="columns">
                <strong class="column is-3">Definition:</strong>
                <div class="column">
                  <textarea class="textarea has-fixed-size" rows="1" cols="10" :maxlength=max_def v-model="card['def']"></textarea>
                </div>
           </div>
        </span>
    </div>
    `
});

let application = new Vue({
  el: "#app",
  data: {
    title: "Term Cards",
    subtitle: "No data-store note card sharing.",
    edit: false,
    share: false,
    share_url: "",
    notecards: [{ term: "term here", def: "definition of term", u_id: Math.floor(Math.random() * Math.random() * 1234), show: true}],
    shuffle: "shuffle"
  },
  methods: {
    add_note_card: function() {
      Vue.set(this.notecards, this.notecards.length, 
      { term: "", def: "", u_id: Math.floor(Math.random() * Math.random() * 1234), show:true}
      );
      //this.notecards.push({ term: "", def: "", u_id: Math.floor(Math.random() * Math.random() * 1234), show:true});
      return;
    },
    del_note_card: function() {
      if (this.notecards.length > 1) {
        Vue.delete(this.notecards, this.notecards.length-1);
        //this.notecards.pop();
      } else {
      }
      return;
    },
    switch_mode: function() {
      this.edit = !this.edit;
    },
    share_note_cards: function() {
      /*take this.notecards and encode using LZMA magic*/
      /*basically all of this code adapted from Topaz's paste program*/

      let notes_as_string = JSON.stringify(this.notecards);
      let content = LZMA.compress(notes_as_string, 1, function(
        compressed,
        error
      ) {
        if (error) {
          alert("Error compressing notes: " + error);
          return;
        }

        let bin_data = new Uint8Array(compressed);

        let reader = new FileReader();
        reader.onload = function() {
          let base64 = reader.result.substr(reader.result.indexOf(",") + 1);
          let url =
            "http://" +
            window.location.host +
            window.location.pathname +
            "#" +
            base64;
          application.display_share_url(url);
        };

        reader.readAsDataURL(new Blob([bin_data]));
        return;
      });
    },
    display_share_url: function(url) {
      if (url.length >= 2000){
        alert("You've reached the maximum URL length for encoding data.\nFunctionality past this point is not guaranteed.");
      }
      this.share = true;
      this.share_url = url;
    },
    convert_url_to_notecards: function() {
      /*use magic lzma decoding*/
      /*Again, basically all code adapted from Topaz's Paste Program */
      let base64 = window.location.hash.substr(1);
      if (base64.length == 0) return;

      fetch("data:application/octet-stream;base64," + base64)
        .then(r => r.blob())
        .then(function(blob) {
          let reader = new FileReader();
          reader.onload = function() {
            let compressed_data = Array.from(new Uint8Array(reader.result));
            LZMA.decompress(compressed_data, function(plaintext, error) {
              if (error) {
                alert("Sorry, failed to load data from url: " + error);
                return;
              } else {
                console.log("Successfully loaded url!");
              }
              application.load_share_url(JSON.parse(plaintext));
            });
          };
          reader.readAsArrayBuffer(blob);
        });
    },
    load_share_url: function(parsed_cards) {
      this.notecards = parsed_cards;
    },
    shuffle_cards: function() {
        // fisher-yates shuffle algorithm
        let entries = this.notecards.length;
        while (entries){
            let random_index = Math.floor(Math.random() * entries--);
            let intermediate = this.notecards[random_index];
            Vue.set(this.notecards, random_index, this.notecards[entries]);
            Vue.set(this.notecards, entries, intermediate);
        }
    }
  },
  beforeMount() {
    this.convert_url_to_notecards();
  }
});
