# Copyright Vik Anand
#This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
    # the Free Software Foundation, either version 3 of the License.

    # This program is distributed in the hope that it will be useful,
    # but WITHOUT ANY WARRANTY; without even the implied warranty of
    # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    # GNU General Public License for more details.

    # You should have received a copy of the GNU General Public License
    # along with this program.  If not, see <https://www.gnu.org/licenses/>.

import sys
from  prettytable import PrettyTable
from datetime import datetime

class ABX:
    
    def __init__(self, name):
        self.name = name
        self.admin_dates = list()
        self.admin_dosages = list()

    def __str__(self):
        return str(self.name) + " " + str(self.admin_dates) + " " + str(self.admin_dosages)

    def add_admin(self, date_admin, dose_admin):
        self.admin_dates.append(date_admin)
        self.admin_dosages.append(dose_admin)
    
    
table = PrettyTable()
wt = sys.argv[1]

abx_raw_rows = list()
abx_table = list()
abx_list = list()
date_list = list()

for line in sys.stdin:
    abx_raw_rows.append(line)
    
for row in abx_raw_rows:
    abx_table.append(row.split("\t"))



#PUT DATES IN A LIST
#========================================
#========================================
for date in abx_table[0]: 
    if not (date.lower() == "antibiotics"):        
        date_list.append(datetime.strptime(date.rstrip(),"%m/%d/%Y %H:%M"))


#Build the ABX list
#========================================
#========================================
i = 0
for row in abx_table[2:]:
    j = 0
    abx_list.append(ABX(row[0])) #add the name to the abx object
    for dose in row:
        try:
            abx_list[i].add_admin(date_list[j], int(dose.split(" ")[0].replace(",","")))
        except:
            pass
            #it failed to add as dose
        j += 1
    i += 1



table.field_names = ["Antibiotic", "Start", "End", "Days"]


for abx in abx_list:
    
    abx_name = abx.name 
    conseq_start_dates = ""
    conseq_end_dates = ""
    duration_days = ""

    
    num_of_dates = len(abx.admin_dates)

    i = 0
    while (i < num_of_dates):
        current_end = abx.admin_dates[i].toordinal()
        current_begin = current_end #set the new begining date to the current end
        
        sys.stdout.flush()
        
        #while not at the end and the next value is consecuitve, keep advancing i and updating current_begin
        while ( (not (i == num_of_dates - 1)) and ((current_begin - abx.admin_dates[i+1].toordinal()) <= 1)):
            current_begin = abx.admin_dates[i+1].toordinal()
            i += 1        
            sys.stdout.flush()
        
        #now we've finished advancing, add the sequence to the strings
        conseq_end_dates += datetime.fromordinal(current_end).strftime("%m/%d") + "\n"
        conseq_start_dates += datetime.fromordinal(current_begin).strftime("%m/%d") + "\n"
        duration_days += str(current_end - current_begin + 1) + "\n"
        abx_name += "\n"


        i += 1

    
    table.add_row([abx_name, conseq_start_dates, conseq_end_dates, duration_days])


print(table)
sys.stdout.flush()