<script setup lang="ts">
import { ref } from 'vue';


const showNoteModal = ref(false as boolean)



const designTypes = [
  { id: 1, label: 'UK NA', image: 'src/assets/img/UK-icon.png' },
  { id: 1, label: 'Irish NA', image: 'src/assets/img/irish-icon.png' },
  { id: 1, label: 'IR NA', image: 'src/assets/img/IR-icon.png' },
]


</script>



<template>
  <div class="col-lg-5">
    <panel label="General Information" icon="/src/assets/img/generalInformation.png" size="col-lg-12">
      <template v-slot:body>
        <div class="mx-4">
          <div class="mb-3 py-2">
            <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Project Name</label>
            <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
          </div>
          <div class="py-2">
            <label class="form-label mb-2 input-label">Element Item</label>
            <div class="form-check fs-16">
              <input class="form-check-input" type="radio" name="Element" id="ElementColumn">
              <label class="form-check-label  fs-16" for="ElementColumn">
                column
              </label>
            </div>
            <div class="form-check fs-16">
              <input class="form-check-input" type="radio" name="Element" id="ElementRafter" checked>
              <label class="form-check-label fs-16" for="ElementRafter">
                rafter
              </label>
            </div>
          </div>
          <div class="py-2">
            <div class="mb-1 pt-1">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Column Height/Rater Span
                (m)</label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>

          </div>
          <div class="py-2">

            <div class="mb-1 pt-1">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Designer</label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
          </div>
          <div class="py-3">
            <div class="mb-1 pt-1">
              <label for="exampleFormControlTextarea1" class="form-label mb-1 input-label">Note</label>
              <textarea class="form-control fs-16" id="exampleFormControlTextarea1" rows="5"></textarea>
            </div>
          </div>
        </div>
      </template>
    </panel>
  </div>


  <div class="col-lg-5">
    <panel label="Location" icon="/src/assets/img/localisation.png" size="col-lg-12" style="padding-bottom: 2px;">
      <template v-slot:body>
        <sub-panel label="Design to">
          <template v-slot:body>
            <div class="card-body d-flex pt-2 pb-3 px-2 ">
              <dropdown-with-img :options="designTypes" class="fs-12 col-7"></dropdown-with-img>
              <span class="mx-3 my-2 fs-14 fw-500" style="color: #BEBEBE;">OR</span>
              <button type="button" class="col-4 btn btn-primary px-2 fs-14 fw-400" @click="showNoteModal = true"
                style="background-color: #125CCB;">Define a Code</button>
            </div>
          </template>
        </sub-panel>
        <sub-panel label="Location">
          <template v-slot:body>
            <div class="card-body px-2 py-2">
              <div class="form-check fs-16">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label fs-16" for="flexRadioDefault2">
                  Expression 6.10
                </label>
              </div>
              <div class="form-check fs-16">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label fs-16" for="flexRadioDefault1">
                  Expression 6.10a and 6.10b
                </label>
              </div>
            </div>
          </template>
        </sub-panel>
      </template>
    </panel>
    <panel label="Deflection Limits( span / limit)" icon="/src/assets/img/ruler.png" size="col-lg-12">
      <template v-slot:body>
        <div class="card-body px-2 py-2 mx-5">
          <div class="row mb-1 pt-1 d-flex">
            <div class="col-lg-3 p-0 py-1">
              <label for="exampleFormControlInput1" class="form-label mb-0 d-flex align-self-center input-label">Variable
                Loads</label>
            </div>
            <div class="col-lg-9 py-1">
              <input type="text" class="form-control fs-16 mx-2" id="exampleFormControlInput1">
            </div>
            <div class="col-lg-3 p-0 py-1">
              <label for="exampleFormControlInput1" class="form-label mb-0 d-flex align-self-center input-label">Total
                Loads</label>
            </div>
            <div class="col-lg-9 py-1">
              <input type="text" class="form-control fs-16 mx-2" id="exampleFormControlInput1">
            </div>
          </div>
        </div>
      </template>
    </panel>

    <vue-modal btnClassList="btn btn-success" :isShowModal="showNoteModal" headerTitle="Define Code"
      @closeModal="showNoteModal = !showNoteModal" width="846px" height="692px">

      <div class="row" style="margin: 0px50px;">
        <div class="col-6" style="padding:0px 40px;">         
            <div class="mb-1 py-3 ">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Gamma G</label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
            <div class="mb-1 py-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Gamma Q</label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
            <div class="mb-1 py-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Reduction Factor F</label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
            <div class="mb-1 py-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Modification Factor Kfl, h/b &lt;= 2</label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
            <div class="mb-1 py-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Modification Factor Kfl All Other h/b</label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
            <div class="mb-1 py-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Steel Grade S235, t &lt; 16mm</label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>         
        </div>
        <div class="col-6" style="padding:0px 40px;">         
            <div class="mb-1 py-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Steel Grade S235, 16 &lt; t &lt; 40mm </label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
            <div class="mb-1 py-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Steel Grade S235, 40 &lt; t &lt; 63mm </label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
            <div class="mb-1 py-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Steel Grade S255, t &lt; 16mm</label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
            <div class="mb-1 py-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Steel Grade S255, 16 &lt; t &lt; 40mm </label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
            <div class="mb-1 py-3">
              <label for="exampleFormControlInput1" class="form-label mb-1 input-label">Steel Grade S255, 40 &lt; t &lt; 63mm </label>
              <input type="text" class="form-control fs-16" id="exampleFormControlInput1">
            </div>
            <div class="mb-1 py-5">
              <button type="button" class="col-4 btn btn-primary px-2 fs-14 fw-400 w-100" 
                style="background-color: #125CCB; height:35px ;">Save</button>
            </div>         
        </div>
      </div>

    </vue-modal>

  </div>
</template>

