<template>
    <div class="col-11">
        <panel label="Loading" icon="/src/assets/img/Loading-icon.png" size="col-lg-12">
            <template v-slot:body>
                <div class="row px-2 py-3">
                    <div class="d-flex justify-content-start ">
                    <span class="fs-14 fw-500 mx-3" style="opacity: 78%;">Load Input</span>
                    <div class="form-check mx-3">
                        <input class="form-check-input fs-16" type="radio" name="Element" id="Characteristic" checked>
                        <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Characteristic">
                            Characteristic Loads
                        </label>
                    </div>
                    <div class="form-check mx-3 ">
                        <input class="form-check-input fs-16" type="radio" name="Element" id="Ultimate">
                        <label class="form-check-label fs-16 fw-400" style="opacity: 78%;" for="Ultimate">
                            Ultimate Loads
                        </label>
                    </div>
                </div>
                </div>
                
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr
                                style="text-align:left;background-color:#FBFBFB; height: 36px;vertical-align: middle; opacity: 78%;">
                                <td class="px-4 fs-14 fw-500" colspan="5">ULS Loads</td>
                            </tr>
                            <tr class="fs-14 fw-500"
                                style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td>Parament</td>
                                <td>Variable</td>
                                <td>Start</td>
                                <td>End</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td class="px-4" style="width: 25%; text-align: left;">UDL (kN/m)</td>
                                <td><input type="number" name="Parament" id="Parament"></td>
                                <td><input type="number" name="Variable" id="Variable"></td>
                                <td><input type="number" name="Start" id="Start"></td>
                                <td><input type="number" name="End" id="End"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr
                                style="text-align:left;background-color:#FBFBFB; height: 36px;vertical-align: middle; opacity: 78%;">
                                <td class="px-4 fs-14 fw-500" colspan="5">Partial UDL (kN/m)</td>
                            </tr>
                            <tr class="fs-14 fw-500"
                                style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                <td>Parament</td>
                                <td>Variable</td>
                                <td>Start</td>
                                <td>End</td>
                                <td>Add / Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td style="width: 20%;"><input type="number" name="Parament1" id="Parament1"></td>
                                <td style="width: 20%;"><input type="number" name="Parament2" id="Parament2"></td>
                                <td style="width: 20%;"><input type="number" name="Parament3" id="Parament3"></td>
                                <td style="width: 20%;"><input type="number" name="Parament4" id="Parament4"></td>
                                <td style="width: 20%;">
                                    <button type="button" class="col-6 btn btn-primary px-2 fs-14 fw-400"
                                        style="color: #125CCB; background-color: rgba(18, 92, 203, 0.04); border: 0px;">
                                        Add
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">
                        <thead> 
                            <tr class="fs-14 fw-500"
                                style="background-color:#F6F6F6;height: 48px; color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td>Parament</td>
                                <td>Variable</td>
                                <td>Compression +ve</td>                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td style="width: 25%;">End Moment left (kNm)</td>
                                <td><input type="number" name="Parament6" id="Parament6"></td>
                                <td><input type="number" name="Parament7" id="Parament7"></td>
                                <td style="width: 35%;" rowspan="2">
                                <img src="src/assets/img/compression.png" alt="">
                                </td>
                                
                            </tr>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td>End Moment right (kNm)</td>
                                <td><input type="number" name="Parament6" id="Parament6"></td>
                                <td><input type="number" name="Parament7" id="Parament7"></td>                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row px-4 py-3">
                    <table class="table table-bordered text-center">                       
                        <tbody>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td style="width: 25%;background-color:#F6F6F6;">Axial force (kN)</td>
                                <td style="background-color:#F6F6F6;">Parament</td>
                                <td style="background-color:#F6F6F6;">Variable</td>
                                <td style="width: 35%;" rowspan="2">
                                    <img src="src/assets/img/compression-2.png" alt="">
                                </td>
                                
                            </tr>
                            <tr class="fs-14 fw-500 py-0" style="height: 48px;color: #5C5C5C;vertical-align: middle;">
                                <td></td>
                                <td><input type="number" name="Parament6" id="Parament6"></td>
                                <td><input type="number" name="Parament7" id="Parament7"></td>                                
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="row py-3">
                    <img src="src/assets/img/view.png" alt="">
                </div>



            </template>
        </panel>
    </div>
</template>

<style scoped>
.table tr td input {
    padding: 0px;
    margin: 0px;
    height: 48px;
    width: 100%;
    background-color: #FEFEFE;
    text-align: center;
    border: 0px;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    opacity: 87%;
}

.table tr td input:focus {
    border: 1px;
    outline-color: #125CCB;
    opacity: 78%;
    color: #B8B8B8;
}

table tr td {
    padding: 0px;
    font-size: 14px;
    font-weight: 500;
}


input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {

    position: absolute;
    top: 5px;
    right: 5px;
    height: 80%;
    color-scheme: light !important;

}
</style>