<script setup lang="ts">
import { inject, reactive, ref } from 'vue';
import radioGroupButton from '@/shared/components/radioGroupButton.vue';
import panel from '@/shared/components/panel.vue';
import inputNumber from '@/shared/components/inputNumber.vue';
import singleSelect from '@/shared/components/singleSelect.vue';
import type ApiServise from '@/core/services/api.service';
import type Link from '@/models/link';
import type LocalizationDto from '@/models/localizationDto';
import constants from '@/shared/globals/constants';
import { DesignType } from '@/enums/designType';
import { ULSLoadExpression } from '@/enums/uLSLoadExpression';
import helper from '@/shared/common/helper';
import type ListItem from '@/models/listItem';
import type DeflectionLimit from '@/models/deflectionLimit';

export interface Props {
  links: Link[]
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['nextStep', 'saveLinks']);


const apiServise = inject('apiServise') as ApiServise;


const designTypes = helper.convertEnumToListItem(DesignType)
const uLSLoadExpressions = helper.convertEnumToListItem(ULSLoadExpression)


const designTypeUserDefined = DesignType.UserDefined;
const designTypeExpression610aAnd610b = ULSLoadExpression.Expression610aAnd610b;

const localizationDto = reactive({ deflectionLimit: {} as DeflectionLimit } as LocalizationDto);

console.log(props.links);


apiServise.callApi(props.links, constants.localisation.getLocalization).then((data: LocalizationDto) => {
debugger
  localizationDto.defaultNA = data.defaultNA;
  localizationDto.deflectionLimit = data.deflectionLimit;
  localizationDto.designParameters = data.designParameters;
  localizationDto.designType = data.designType ? data.designType : DesignType.UK;
  localizationDto.psiValue = data.psiValue == 0 ? 1 : data.psiValue;
  localizationDto.uLSLoadExpression = data.uLSLoadExpression ? data.uLSLoadExpression : ULSLoadExpression.Expression610a;

  localizationDto._links = data._links;

  console.log(data);
  emit('saveLinks', data._links);

})


const changeDesigenItem = (desigenItem) => {
  if (desigenItem == designTypeUserDefined) {
    localizationDto.designParameters = localizationDto.defaultNA;
  }
}

const saveModel = (isNextStep = false)=>{
  apiServise.callApi(props.links, constants.localisation.saveLocalisation,localizationDto).then((data) => {
    // emit('saveLinks',data._links);
    console.log(data);
    
    isNextStep && emit('nextStep');
  })

}

const psiList = [
  {
    id: 1,
    title: '1'
  } as unknown as ListItem,
  {
    id: 0.7,
    title: '0.7'
  } as unknown as ListItem,
  {
    id: 0.5,
    title: '0.5'
  } as unknown as ListItem,


]



</script>


<template>
  <div class="row">
    <div class="col-md-4">
      <panel label="Desigen To">
        <template v-slot:body>
          <radio-group-button v-model="localizationDto.designType" :items="designTypes" name="desigenItems" value="id"
            title="title" @changed="changeDesigenItem($event)" />


          <div v-if="localizationDto.designType == designTypeUserDefined">
            <hr>
            <input-number v-model="localizationDto.designParameters.gammaG" label="Gamma G" :labelWidth="9" />
            <input-number v-model="localizationDto.designParameters.gammaQ" label="Gamma Q" :labelWidth="9" />
            <input-number v-model="localizationDto.designParameters.reductionFactorF" label="Reduction Factor F"
              :labelWidth="9" />
            <input-number v-model="localizationDto.designParameters.modificationFactorKflHtoBLessThanTwo"
              label="Modification Factor Kfl, h/b <= 2" :labelWidth="9" />
            <input-number v-model="localizationDto.designParameters.modificationFactorAllOtherHtoB"
              label="Modification Factor Kfl All Other h/b" :labelWidth="9" />
            <input-number v-model="localizationDto.designParameters.steelGradeS235LessThan16mm"
              label="Steel Grade S235, t < 16mm" :labelWidth="9" />
            <input-number v-model="localizationDto.designParameters.steelGradeS235Between16and40mm"
              label="Steel Grade S235, 16 < t < 40mm" :labelWidth="9" />
            <input-number v-model="localizationDto.designParameters.steelGradeS235Between40and63mm"
              label="Steel Grade S235, 40 < t < 63mm" :labelWidth="9" />
            <input-number v-model="localizationDto.designParameters.steelGradeS355LessThan16mm"
              label="Steel Grade S255, t < 16mm" :labelWidth="9" />
            <input-number v-model="localizationDto.designParameters.steelGradeS355Between16and40mm"
              label="Steel Grade S255, 16 < t < 40mm" :labelWidth="9" />
            <input-number v-model="localizationDto.designParameters.steelGradeS355Between40and63mm"
              label="Steel Grade S255, 40 < t < 63mm" :labelWidth="9" />

          </div>

        </template>
      </panel>

    </div>
    <div class="col-md-4">
      <panel label="ULS Loads calculated to EN 1990">
        <template v-slot:body>

          <radio-group-button v-model="localizationDto.uLSLoadExpression" :items="uLSLoadExpressions" name="ULDItems"
            value="id" title="title" />
          <div v-if="localizationDto.uLSLoadExpression == designTypeExpression610aAnd610b">
            <hr>
            <single-select :items="psiList" v-model="localizationDto.psiValue" :labelWidth="8"
              label="Psi for expression 6.10a" />

          </div>
        </template>
      </panel>
    </div>
    <div class="col-md-4">
      <panel label="Deflection Limits(span/limit)">
        <template v-slot:body>
          <input-number v-model="localizationDto.deflectionLimit.variableLoads" label="Variable loads" :labelWidth="7" />
          <input-number v-model="localizationDto.deflectionLimit.totalLoads" label="Total loads" :labelWidth="7" />
        </template>
      </panel>
    </div>
  </div>

  <div class="row" style="position: absolute;bottom: 70px;right: 75px; justify-content: end; display: flex;width: 100%;">
    <button class="btn btn-primary col col-md-2 mx-2" @click="saveModel()">save</button>
    <button class="btn btn-success col col-md-2 mx-2" @click="saveModel(true)">save and next</button>
  </div>
</template>
