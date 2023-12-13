<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import type ApiServise from '@/core/services/api.service';
import type Link from '@/models/link';
import type OrderDto from '../../../dtos/orderDto';
import constants from '@/shared/globals/newConstants';
import { ElementType } from '@/enums/elementType';
import { DesignType } from '@/enums/designType';
import type DeflectionLimit from '@/models/deflectionLimit';
import type DesignParameters from '@/models/designParameters';
import { ULSLoadExpression } from '@/enums/uLSLoadExpression';
import { SteelType } from '@/enums/steelType';


export interface Props {
  links: Link[]
}

const props = withDefaults(defineProps<Props>(), {
  //hasCreated: false
});


const apiServise = inject('apiServise') as ApiServise;

const emit = defineEmits(['nextStep', 'clearForm', 'saveLinks']);

const showNoteModal = ref(false as boolean)
const orderDto = reactive(
  {
    elementType: ElementType.Column,
    designType: DesignType.UserDefined,
    uLSLoadExpression: ULSLoadExpression.Expression610a,
    deflectionLimit: {} as DeflectionLimit,
    designParameters: {} as DesignParameters,
    steelType: SteelType.S235
  } as OrderDto);

const designParameters = reactive({} as DesignParameters)

const elementType = ElementType;
const uLSLoadExpression = ULSLoadExpression;
const designType = DesignType;
const steelType = SteelType;


const designTypes = [
  { id: 0, label: 'Select ...' },
  { id: 1, label: 'UK NA', image: 'src/assets/img/UK-icon.png' },
  { id: 2, label: 'Irish NA', image: 'src/assets/img/irish-icon.png' },
  { id: 3, label: 'Iran', image: 'src/assets/img/IR-icon.png' },
  // { id: 4, label: 'User Defined', image: 'src/assets/img/user-defined.png' },
];


onMounted(() => {
  if (props.links.some(e => e.rel == constants.generalDetails.getOrder)) {
    apiServise.callApi(props.links, constants.generalDetails.getOrder).then((data) => {
      console.log(data);
      orderDto.projectName = data.projectName
      orderDto.designer = data.designer
      orderDto.note = data.note
      orderDto.elementType = data.elementType
      orderDto.span = data.span
      orderDto.designType = data.designType
      orderDto.designParameters = data.designParameters
      orderDto.deflectionLimit = data.deflectionLimit
      orderDto.uLSLoadExpression = data.uLSLoadExpression
      orderDto.steelType = data.steelType
    });
  }
})

const saveDesignParameters = () => {
  orderDto.designParameters = designParameters;
  showNoteModal.value = false;
}

const nextStep = async () => {
  debugger
  const type = props.links.some(e => e.rel == constants.generalDetails.saveOrder) ? constants.generalDetails.saveOrder : constants.generalDetails.createOrder;
  const data = await apiServise.callApi(props.links, type, orderDto);
  emit('saveLinks', data._links);
  emit("nextStep");
}

const clearForm = () => {
  emit("clearForm");
}


</script>



<template>
  <div class="col-11">
    <div class="row">
      <div class="col-lg-6">
        <panel label="General Information" icon="/src/assets/img/generalInformation.png" size="col-lg-12">
          <template v-slot:body>
            <div class="mx-4">
              <div class="mb-3 py-2">
                <label for="projectName" class="form-label mb-1 input-label">Project Name</label>
                <input type="text" class="form-control fs-16" id="projectName" v-model="orderDto.projectName">
              </div>
              <div class="py-2">
                <label class="form-label mb-2 input-label">Element Item</label>
                <div class="form-check fs-16">
                  <input class="form-check-input" type="radio" name="Element" id="ElementColumn"
                    :value="elementType.Column" v-model="orderDto.elementType">
                  <label class="form-check-label  fs-16" for="ElementColumn">
                    column
                  </label>
                </div>
                <div class="form-check fs-16">
                  <input class="form-check-input" type="radio" name="Element" id="ElementRafter"
                    :value="elementType.Rafter" v-model="orderDto.elementType">
                  <label class="form-check-label fs-16" for="ElementRafter">
                    rafter
                  </label>
                </div>
              </div>
              <div class="py-2">
                <div class="mb-1 pt-1">
                  <label for="span" class="form-label mb-1 input-label">Column Height/Rater Span
                    (m)</label>
                  <input type="number" class="form-control fs-16" id="span" v-model="orderDto.span">
                </div>

              </div>
              <div class="py-2">

                <div class="mb-1 pt-1">
                  <label for="designer" class="form-label mb-1 input-label">Designer</label>
                  <input type="text" class="form-control fs-16" id="designer" v-model="orderDto.designer">
                </div>
              </div>
              <div class="py-3">
                <div class="mb-1 pt-1">
                  <label for="note" class="form-label mb-1 input-label">Note</label>
                  <textarea class="form-control fs-16" id="note" rows="5" v-model="orderDto.note"></textarea>
                </div>
              </div>
            </div>
          </template>
        </panel>
      </div>
      <div class="col-lg-6">
        <panel label="Location" icon="/src/assets/img/localisation.png" size="col-lg-12" style="padding-bottom: 2px;">
          <template v-slot:body>
            <sub-panel label="Design to">
              <template v-slot:body>
                <div class="card-body d-flex pt-2 pb-3 px-2 ">
                  <dropdown-with-img :options="designTypes" class="fs-12 col-7"
                    v-model="orderDto.designType"></dropdown-with-img>
                  <span class="mx-3 my-2 fs-14 fw-500" style="color: #BEBEBE;">OR</span>
                  <button type="button" class="col-4 btn btn-primary px-2 fs-14 fw-400" @click="showNoteModal = true"
                    style="background-color: #125CCB;">Define a Code</button>
                </div>
              </template>
            </sub-panel>
            <sub-panel label="Location">
              <template v-slot:body>
                <div class="card-body px-2 py-2" v-if="orderDto.designType != designType.Iran">
                  <div class="form-check fs-16">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                      :value="uLSLoadExpression.Expression610a" v-model="orderDto.uLSLoadExpression">
                    <label class="form-check-label fs-16" for="flexRadioDefault2">
                      Expression 6.10
                    </label>
                  </div>
                  <div class="form-check fs-16">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                      :value="uLSLoadExpression.Expression610aAnd610b" v-model="orderDto.uLSLoadExpression">
                    <label class="form-check-label fs-16" for="flexRadioDefault1">
                      Expression 6.10a and 6.10b
                    </label>
                  </div>
                </div>
                <div class="card-body px-2 py-2" v-else>
                  <div class="form-check fs-16">
                    <input class="form-check-input" type="radio" checked id="LRFD">
                    <label class="form-check-label fs-16">
                      LRFD
                    </label>
                  </div>
                </div>
              </template>
            </sub-panel>
          </template>
        </panel>
        <panel label="Steel" icon="/src/assets/img/ruler.png" size="col-lg-12">
          <template v-slot:body>
            <div class="card-body px-4 py-2">
                  <div class="form-check fs-16">
                    <input class="form-check-input" type="radio" name="steelType" id="S275"
                      :value="steelType.S235" v-model="orderDto.steelType">
                    <label class="form-check-label fs-16" for="S275">
                      ST-37 (s 235)
                    </label>
                  </div>
                  <div class="form-check fs-16">
                    <input class="form-check-input" type="radio" name="steelType" id="S355"
                      :value="steelType.S355" v-model="orderDto.steelType">
                    <label class="form-check-label fs-16" for="S355">
                      ST-38 (s 355)
                    </label>
                  </div>
                </div>

          </template>
        </panel>
        
        <panel label="Deflection Limits( span / limit)" icon="/src/assets/img/ruler.png" size="col-lg-12">
          <template v-slot:body>
            <div class="card-body px-2 py-2 mx-5">
              <div class="row mb-1 pt-1 d-flex">
                <div class="col-lg-3 p-0 py-1">
                  <label for="variableLoads" class="form-label mb-0 d-flex align-self-center input-label">Variable
                    Loads</label>
                </div>
                <div class="col-lg-9 py-1">
                  <input type="number" class="form-control fs-16 mx-2" id="variableLoads"
                    v-model="orderDto.deflectionLimit.variableLoads">
                </div>
                <div class="col-lg-3 p-0 py-1">
                  <label for="totalLoads" class="form-label mb-0 d-flex align-self-center input-label">Total
                    Loads</label>
                </div>
                <div class="col-lg-9 py-1">
                  <input type="number" class="form-control fs-16 mx-2" id="totalLoads"
                    v-model="orderDto.deflectionLimit.totalLoads">
                </div>
              </div>
            </div>
          </template>
        </panel>
        <vue-modal btnClassList="btn btn-success" :isShowModal="showNoteModal" headerTitle="Define Code"
          @closeModal="showNoteModal = !showNoteModal" width="846px">

          <div class="row">
            <div class="col-6" style="padding:0px 40px;">
              <div class="mb-1 py-2 ">
                <label for="gammaG" class="form-label mb-1 input-label">Gamma G</label>
                <input type="number" class="form-control fs-16" id="gammaG" v-model="designParameters.gammaG">
              </div>
              <div class="mb-1 py-2">
                <label for="gammaQ" class="form-label mb-1 input-label">Gamma Q</label>
                <input type="number" class="form-control fs-16" id="gammaQ" v-model="designParameters.gammaQ">
              </div>
              <div class="mb-1 py-2">
                <label for="reductionFactorF" class="form-label mb-1 input-label">Reduction Factor F</label>
                <input type="number" class="form-control fs-16" id="reductionFactorF"
                  v-model="designParameters.reductionFactorF">
              </div>
              <div class="mb-1 py-2">
                <label for="modificationFactorKflHtoBLessThanTwo" class="form-label mb-1 input-label">Modification Factor
                  Kfl, h/b
                  &lt;=
                  2</label>
                <input type="number" class="form-control fs-16" id="modificationFactorKflHtoBLessThanTwo"
                  v-model="designParameters.modificationFactorKflHtoBLessThanTwo">
              </div>
              <div class="mb-1 py-2">
                <label for="modificationFactorAllOtherHtoB" class="form-label mb-1 input-label">Modification Factor Kfl
                  All
                  Other
                  h/b</label>
                <input type="number" class="form-control fs-16" id="modificationFactorAllOtherHtoB"
                  v-model="designParameters.modificationFactorAllOtherHtoB">
              </div>
              <div class="mb-1 py-2">
                <label for="steelGradeS235LessThan16mm" class="form-label mb-1 input-label">Steel Grade S235, t &lt;
                  16mm</label>
                <input type="number" class="form-control fs-16" id="steelGradeS235LessThan16mm"
                  v-model="designParameters.steelGradeS235LessThan16mm">
              </div>
            </div>
            <div class="col-6" style="padding:0px 40px;">

              <div class="mb-1 py-2">
                <label for="steelGradeS235Between16and40mm" class="form-label mb-1 input-label">Steel Grade S235, 16 &lt;
                  t &lt;
                  40mm </label>
                <input type="number" class="form-control fs-16" id="steelGradeS235Between16and40mm"
                  v-model="designParameters.steelGradeS235Between16and40mm">
              </div>
              <div class="mb-1 py-2">
                <label for="steelGradeS235Between40and63mm" class="form-label mb-1 input-label">Steel Grade S235, 40 &lt;
                  t &lt;
                  63mm </label>
                <input type="number" class="form-control fs-16" id="steelGradeS235Between40and63mm"
                  v-model="designParameters.steelGradeS235Between40and63mm">
              </div>
              <div class="mb-1 py-2">
                <label for="steelGradeS355LessThan16mm" class="form-label mb-1 input-label">Steel Grade S255, t &lt;
                  16mm</label>
                <input type="number" class="form-control fs-16" id="steelGradeS355LessThan16mm"
                  v-model="designParameters.steelGradeS355LessThan16mm">
              </div>
              <div class="mb-1 py-2">
                <label for="steelGradeS355Between16and40mm" class="form-label mb-1 input-label">Steel Grade S255, 16 &lt;
                  t &lt;
                  40mm </label>
                <input type="number" class="form-control fs-16" id="steelGradeS355Between16and40mm"
                  v-model="designParameters.steelGradeS355Between16and40mm">
              </div>
              <div class="mb-1 py-2">
                <label for="steelGradeS355Between40and63mm" class="form-label mb-1 input-label">Steel Grade S255, 40 &lt;
                  t &lt;
                  63mm </label>
                <input type="number" class="form-control fs-16" id="steelGradeS355Between40and63mm"
                  v-model="designParameters.steelGradeS355Between40and63mm">
              </div>
              <div class="mb-1  py-2">
                <label class="form-label mb-1 input-label" style="visibility: hidden;">save</label>
                <button type="button" class="col-4 btn btn-primary px-2 fs-14 fw-400 w-100" @click="saveDesignParameters"
                  style="background-color: #125CCB; height:35px ;">Save</button>
              </div>
            </div>
          </div>
        </vue-modal>

      </div>
    </div>
    <div class="row d-flex justify-content-end py-5">
      <button type="button" class="btn px-2 fs-16 fw-500 mx-2" @click="clearForm"
        style="background-color: #F4F4F4; width: 196px; height: 42px; color: #125CCB;">Clear All</button>
      <button type="button" class="btn btn-primary px-2 fs-16 fw-500  mx-2" @click="nextStep"
        style="background-color: #125CCB; width: 196px; height: 42px;">Next</button>
    </div>
  </div>
</template>


