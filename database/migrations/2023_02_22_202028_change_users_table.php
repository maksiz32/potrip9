<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\RegisterVariants;
use App\Models\UsersRole;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table
                ->string('external_id')
                ->after('id')
                ->nullable()
                ->default(null)
                ->comment('Id пользователя, вошедшего через внешнюю аутентификацию');
            $table
                ->foreignIdFor(RegisterVariants::class)
                ->after('external_id')
                ->comment('Вид аутентификации юзера');
            $table
                ->boolean('is_block')
                ->default(false)
                ->comment('Отметка блокировки пользователя');
            $table
                ->foreignIdFor(UsersRole::class)
                ->comment('Роль юзера');
            $table
                ->string('login')
                ->after('external_id')
                ->nullable();
            $table->renameColumn('name', 'first_name');
            $table
                ->string('secondary_name')
                ->nullable();
            $table
                ->string('fathers_name')
                ->after('secondary_name')
                ->nullable()
                ->default(null)
                ->comment('Отчество');
            $table
                ->string('city')
                ->after('email')
                ->nullable()
                ->default(null);
            $table
                ->string('site')
                ->after('city')
                ->nullable()
                ->default(null);
            $table
                ->string('address')
                ->after('site')
                ->nullable()
                ->default(null);
            $table
                ->string('description')
                ->nullable()
                ->default(null);
            $table
                ->string('notes')
                ->nullable()
                ->default(null);
            $table
                ->jsonb('settings')
                ->nullable()
                ->default(null);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['users_roles_id']);
            $table->dropForeign(['register_variants_id']);
            $table->dropColumn('external_id');
            $table->dropColumn('is_block');
            $table->dropColumn('login');
            $table->renameColumn('first_name', 'name');
            $table->dropColumn('secondary_name');
            $table->dropColumn('fathers_name');
            $table->dropColumn('city');
            $table->dropColumn('site');
            $table->dropColumn('address');
            $table->dropColumn('description');
            $table->dropColumn('notes');
            $table->dropColumn('settings');
        });
    }
};
